<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Question;
use App\Models\Subcategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class QuestionController extends Controller
{
    /**
     * Display listing of questions
     */
    public function index(Request $request): Response
    {
        $query = Question::with(['subcategory.category', 'creator:id,name']);

        // Search
        if ($request->filled('search')) {
            $query->where('content', 'like', "%{$request->search}%");
        }

        // Filter by category
        if ($request->filled('category_id')) {
            $query->whereHas('subcategory', function ($q) use ($request) {
                $q->where('category_id', $request->category_id);
            });
        }

        // Filter by subcategory
        if ($request->filled('subcategory_id')) {
            $query->where('subcategory_id', $request->subcategory_id);
        }

        // Filter by difficulty
        if ($request->filled('difficulty')) {
            $query->where('difficulty', $request->difficulty);
        }

        // Filter by type
        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        $questions = $query->orderByDesc('created_at')
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Admin/Questions/Index', [
            'questions' => $questions->through(fn($q) => [
                'id' => $q->id,
                'content' => Str::limit(strip_tags($q->content), 150),
                'type' => $q->type,
                'type_label' => $q->type_label,
                'difficulty' => $q->difficulty,
                'difficulty_label' => $q->difficulty_label,
                'subcategory' => [
                    'name' => $q->subcategory->name,
                    'category' => [
                        'name' => $q->subcategory->category->name,
                        'color' => $q->subcategory->category->color,
                    ],
                ],
                'score' => $q->score,
                'is_active' => $q->is_active,
                'creator' => $q->creator->name,
                'created_at' => $q->created_at->toISOString(),
            ]),
            'categories' => Category::active()->ordered()->with('subcategories')->get(),
            'filters' => $request->only(['search', 'category_id', 'subcategory_id', 'difficulty', 'type']),
        ]);
    }

    /**
     * Show create form
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Questions/Form', [
            'categories' => Category::active()->ordered()->with('subcategories')->get(),
            'question' => null,
        ]);
    }

    /**
     * Store new question
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $this->validateQuestion($request);

        // Handle image upload
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('questions', 'public');
        }

        if ($request->hasFile('explanation_image')) {
            $validated['explanation_image'] = $request->file('explanation_image')->store('questions', 'public');
        }

        $validated['created_by'] = auth()->id();

        $question = Question::create($validated);

        if ($request->boolean('create_another')) {
            return redirect()->route('admin.questions.create')
                ->with('success', 'Soal berhasil dibuat. Buat soal lainnya.');
        }

        return redirect()->route('admin.questions.index')
            ->with('success', 'Soal berhasil dibuat.');
    }

    /**
     * Show edit form
     */
    public function edit(Question $question): Response
    {
        $question->load('subcategory.category');

        return Inertia::render('Admin/Questions/Form', [
            'categories' => Category::active()->ordered()->with('subcategories')->get(),
            'question' => [
                'id' => $question->id,
                'subcategory_id' => $question->subcategory_id,
                'category_id' => $question->subcategory->category_id,
                'content' => $question->content,
                'image' => $question->image,
                'type' => $question->type,
                'options' => $question->options,
                'correct_answer' => $question->correct_answer,
                'explanation' => $question->explanation,
                'explanation_image' => $question->explanation_image,
                'score' => $question->score,
                'negative_score' => $question->negative_score,
                'difficulty' => $question->difficulty,
                'is_active' => $question->is_active,
            ],
        ]);
    }

    /**
     * Update question
     */
    public function update(Request $request, Question $question): RedirectResponse
    {
        $validated = $this->validateQuestion($request, $question);

        // Handle image upload
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('questions', 'public');
        }

        if ($request->hasFile('explanation_image')) {
            $validated['explanation_image'] = $request->file('explanation_image')->store('questions', 'public');
        }

        $question->update($validated);

        return redirect()->route('admin.questions.index')
            ->with('success', 'Soal berhasil diperbarui.');
    }

    /**
     * Delete question
     */
    public function destroy(Question $question): RedirectResponse
    {
        // Check if question is used in active tryouts
        $inUseTryouts = $question->tryouts()
            ->where('is_published', true)
            ->whereHas('examSessions', function ($q) {
                $q->where('status', 'in_progress');
            })
            ->count();

        if ($inUseTryouts > 0) {
            return back()->withErrors(['error' => 'Tidak dapat menghapus soal yang sedang digunakan dalam ujian aktif.']);
        }

        $question->delete();

        return redirect()->route('admin.questions.index')
            ->with('success', 'Soal berhasil dihapus.');
    }

    /**
     * Bulk delete questions
     */
    public function bulkDestroy(Request $request): RedirectResponse
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:questions,id',
        ]);

        Question::whereIn('id', $request->ids)->delete();

        return back()->with('success', 'Soal berhasil dihapus.');
    }

    /**
     * Import questions from PDF file
     */
    public function import(Request $request): RedirectResponse
    {
        $request->validate([
            'file' => 'required|mimes:pdf|max:10240',
            'subcategory_id' => 'required|exists:subcategories,id',
        ]);

        try {
            $parser = new \Smalot\PdfParser\Parser();
            $pdf = $parser->parseFile($request->file('file')->getPathname());
            $text = $pdf->getText();

            // Parse the questions from the text
            $questions = $this->parsePdfQuestions($text);

            if (empty($questions)) {
                return back()->with('error', 'Tidak ada soal yang ditemukan dalam PDF.');
            }

            $imported = 0;
            foreach ($questions as $questionData) {
                Question::create([
                    'subcategory_id' => $request->subcategory_id,
                    'content' => $questionData['content'],
                    'type' => 'single',
                    'options' => $questionData['options'],
                    'correct_answer' => $questionData['correct_answer'],
                    'explanation' => $questionData['explanation'] ?? null,
                    'score' => 4,
                    'negative_score' => 1,
                    'difficulty' => 'medium',
                    'is_active' => true,
                    'created_by' => auth()->id(),
                ]);
                $imported++;
            }

            return back()->with('success', "{$imported} soal berhasil diimport dari PDF.");
        } catch (\Exception $e) {
            return back()->with('error', 'Gagal memproses PDF: ' . $e->getMessage());
        }
    }

    /**
     * Preview questions from PDF without saving
     */
    public function previewImport(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:pdf|max:10240',
        ]);

        try {
            $parser = new \Smalot\PdfParser\Parser();
            $pdf = $parser->parseFile($request->file('file')->getPathname());
            $text = $pdf->getText();

            $questions = $this->parsePdfQuestions($text);

            return response()->json([
                'success' => true,
                'questions' => $questions,
                'raw_text' => $text, // For debugging
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Parse questions from PDF text
     */
    private function parsePdfQuestions(string $text): array
    {
        $questions = [];
        
        // Clean up the text
        $text = preg_replace('/\r\n|\r/', "\n", $text);
        
        // Pattern to match questions starting with number followed by period
        // Matches: "1.", "2.", etc.
        $questionPattern = '/(?:^|\n)\s*(\d+)\.\s*/';
        
        // Split the text by question numbers
        $parts = preg_split($questionPattern, $text, -1, PREG_SPLIT_DELIM_CAPTURE | PREG_SPLIT_NO_EMPTY);
        
        $currentNumber = null;
        $currentContent = '';
        
        for ($i = 0; $i < count($parts); $i++) {
            $part = trim($parts[$i]);
            
            // Check if this is a question number
            if (is_numeric($part) && $part >= 1 && $part <= 200) {
                // If we have previous content, process it
                if ($currentNumber !== null && !empty($currentContent)) {
                    $parsed = $this->parseQuestionContent($currentContent);
                    if ($parsed) {
                        $questions[] = $parsed;
                    }
                }
                $currentNumber = (int)$part;
                $currentContent = '';
            } else {
                $currentContent .= $part;
            }
        }
        
        // Process the last question
        if ($currentNumber !== null && !empty($currentContent)) {
            $parsed = $this->parseQuestionContent($currentContent);
            if ($parsed) {
                $questions[] = $parsed;
            }
        }
        
        return $questions;
    }

    /**
     * Parse individual question content
     */
    private function parseQuestionContent(string $content): ?array
    {
        // Try to extract options (A., B., C., D., E.)
        $optionPattern = '/(?:^|\n)\s*([A-E])[\.\)]\s*/i';
        
        // Find where the first option starts
        if (preg_match($optionPattern, $content, $match, PREG_OFFSET_CAPTURE)) {
            $questionText = trim(substr($content, 0, $match[0][1]));
            $optionsAndRest = substr($content, $match[0][1]);
        } else {
            return null; // No options found
        }
        
        // Extract options
        $options = [];
        $parts = preg_split($optionPattern, $optionsAndRest, -1, PREG_SPLIT_DELIM_CAPTURE | PREG_SPLIT_NO_EMPTY);
        
        $currentKey = null;
        $answerSection = '';
        $foundAnswer = false;
        
        for ($i = 0; $i < count($parts); $i++) {
            $part = trim($parts[$i]);
            
            if (preg_match('/^[A-E]$/i', $part)) {
                $currentKey = strtoupper($part);
            } elseif ($currentKey !== null) {
                // Check if this contains the answer/explanation section
                $answerPatterns = [
                    '/Jawaban\s*:\s*([A-E])/i',
                    '/Kunci\s*:\s*([A-E])/i',
                    '/Kunci Jawaban\s*:\s*([A-E])/i',
                ];
                
                $optionText = $part;
                
                foreach ($answerPatterns as $pattern) {
                    if (preg_match($pattern, $part, $answerMatch, PREG_OFFSET_CAPTURE)) {
                        $optionText = trim(substr($part, 0, $answerMatch[0][1]));
                        $answerSection = substr($part, $answerMatch[0][1]);
                        $foundAnswer = true;
                        break;
                    }
                }
                
                // Check for "Pembahasan:" marker
                if (preg_match('/Pembahasan\s*:/i', $optionText, $pembahasanMatch, PREG_OFFSET_CAPTURE)) {
                    $optionText = trim(substr($optionText, 0, $pembahasanMatch[0][1]));
                    if (!$foundAnswer) {
                        $answerSection = substr($part, $pembahasanMatch[0][1] - strlen($optionText));
                    }
                }
                
                if (!empty($optionText)) {
                    $options[] = [
                        'key' => $currentKey,
                        'text' => $optionText,
                        'image' => null,
                    ];
                }
                $currentKey = null;
            }
        }
        
        if (count($options) < 2) {
            return null; // Not enough options
        }
        
        // Extract correct answer
        $correctAnswer = 'A'; // Default
        foreach (['/Jawaban\s*:\s*([A-E])/i', '/Kunci\s*:\s*([A-E])/i', '/Kunci Jawaban\s*:\s*([A-E])/i'] as $pattern) {
            if (preg_match($pattern, $answerSection, $match)) {
                $correctAnswer = strtoupper($match[1]);
                break;
            }
        }
        
        // Extract explanation
        $explanation = null;
        if (preg_match('/Pembahasan\s*:\s*(.+?)(?=\n\d+\.|$)/is', $answerSection, $match)) {
            $explanation = trim($match[1]);
        }
        
        return [
            'content' => $questionText,
            'options' => $options,
            'correct_answer' => $correctAnswer,
            'explanation' => $explanation,
        ];
    }

    /**
     * Validate question request
     */
    private function validateQuestion(Request $request, ?Question $question = null): array
    {
        return $request->validate([
            'subcategory_id' => 'required|exists:subcategories,id',
            'content' => 'required|string',
            'image' => 'nullable|image|max:2048',
            'type' => 'required|in:single,multiple,essay',
            'options' => 'required_unless:type,essay|array|min:2|max:6',
            'options.*.key' => 'required|string|max:10',
            'options.*.text' => 'required|string',
            'options.*.image' => 'nullable|string',
            'correct_answer' => 'required|string',
            'explanation' => 'nullable|string',
            'explanation_image' => 'nullable|image|max:2048',
            'score' => 'required|numeric|min:0',
            'negative_score' => 'nullable|numeric|min:0',
            'difficulty' => 'required|in:easy,medium,hard',
            'is_active' => 'boolean',
        ]);
    }
}
