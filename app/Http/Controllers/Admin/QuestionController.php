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
                'category' => $q->subcategory->category->name,
                'subcategory' => $q->subcategory->name,
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
     * Import questions from file
     */
    public function import(Request $request): RedirectResponse
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,csv',
            'subcategory_id' => 'required|exists:subcategories,id',
        ]);

        // TODO: Implement import logic

        return back()->with('success', 'Soal berhasil diimport.');
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
