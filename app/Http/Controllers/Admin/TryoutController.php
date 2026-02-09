<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Question;
use App\Models\Tryout;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class TryoutController extends Controller
{
    /**
     * Display listing of tryouts
     */
    public function index(Request $request): Response
    {
        $query = Tryout::with(['creator:id,name', 'categories:id,name,color'])
            ->withCount(['questions', 'examSessions as sessions_count']);

        // Search
        if ($request->filled('search')) {
            $query->where('title', 'like', "%{$request->search}%");
        }

        // Filter by status
        if ($request->filled('status')) {
            match($request->status) {
                'published' => $query->where('is_published', true),
                'draft' => $query->where('is_published', false),
                'active' => $query->published()
                    ->where(fn($q) => $q->whereNull('start_time')->orWhere('start_time', '<=', now()))
                    ->where(fn($q) => $q->whereNull('end_time')->orWhere('end_time', '>=', now())),
                default => null,
            };
        }

        $tryouts = $query->orderByDesc('created_at')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/Tryouts/Index', [
            'tryouts' => $tryouts,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    /**
     * Show create form
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Tryouts/Form', [
            'categories' => Category::active()->ordered()->with('subcategories')->get(),
            'tryout' => null,
        ]);
    }

    /**
     * Store new tryout
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'thumbnail' => 'nullable|image|max:2048',
            'duration_minutes' => 'required|integer|min:1|max:600',
            'passing_score' => 'nullable|numeric|min:0|max:100',
            'start_time' => 'nullable|date',
            'end_time' => 'nullable|date|after:start_time',
            'is_published' => 'boolean',
            'is_randomized' => 'boolean',
            'show_result_immediately' => 'boolean',
            'show_leaderboard' => 'boolean',
            'max_attempts' => 'required|integer|min:1|max:99',
            'max_violations' => 'required|integer|min:1|max:99',
            'categories' => 'array',
            'categories.*.id' => 'required|exists:categories,id',
            'categories.*.question_count' => 'required|integer|min:0',
        ]);

        // Handle thumbnail upload
        if ($request->hasFile('thumbnail')) {
            $validated['thumbnail'] = $request->file('thumbnail')->store('tryouts', 'public');
        }

        $validated['slug'] = Str::slug($validated['title']) . '-' . Str::random(6);
        $validated['created_by'] = auth()->id();

        $tryout = Tryout::create($validated);

        // Sync categories
        if (!empty($validated['categories'])) {
            $categoryData = collect($validated['categories'])->mapWithKeys(function ($cat, $index) {
                return [$cat['id'] => [
                    'question_count' => $cat['question_count'],
                    'sort_order' => $index,
                ]];
            })->toArray();

            $tryout->categories()->sync($categoryData);
        }

        // Calculate total questions
        $tryout->update(['total_questions' => $tryout->categories()->sum('question_count')]);

        return redirect()->route('admin.tryouts.edit', $tryout)
            ->with('success', 'Tryout berhasil dibuat.');
    }

    /**
     * Show edit form
     */
    public function edit(Tryout $tryout): Response
    {
        $tryout->load(['categories', 'questions']);

        return Inertia::render('Admin/Tryouts/Form', [
            'categories' => Category::active()->ordered()->with('subcategories')->get(),
            'tryout' => [
                'id' => $tryout->id,
                'title' => $tryout->title,
                'slug' => $tryout->slug,
                'description' => $tryout->description,
                'thumbnail' => $tryout->thumbnail,
                'duration_minutes' => $tryout->duration_minutes,
                'total_questions' => $tryout->total_questions,
                'passing_score' => $tryout->passing_score,
                'start_time' => $tryout->start_time?->format('Y-m-d\TH:i'),
                'end_time' => $tryout->end_time?->format('Y-m-d\TH:i'),
                'is_published' => $tryout->is_published,
                'is_randomized' => $tryout->is_randomized,
                'show_result_immediately' => $tryout->show_result_immediately,
                'show_leaderboard' => $tryout->show_leaderboard,
                'max_attempts' => $tryout->max_attempts,
                'max_violations' => $tryout->max_violations,
                'categories' => $tryout->categories->map(fn($cat) => [
                    'id' => $cat->id,
                    'name' => $cat->name,
                    'question_count' => $cat->pivot->question_count,
                ]),
                'questions_count' => $tryout->questions->count(),
            ],
        ]);
    }

    /**
     * Update tryout
     */
    public function update(Request $request, Tryout $tryout): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'thumbnail' => 'nullable|image|max:2048',
            'duration_minutes' => 'required|integer|min:1|max:600',
            'passing_score' => 'nullable|numeric|min:0|max:100',
            'start_time' => 'nullable|date',
            'end_time' => 'nullable|date|after:start_time',
            'is_published' => 'boolean',
            'is_randomized' => 'boolean',
            'show_result_immediately' => 'boolean',
            'show_leaderboard' => 'boolean',
            'max_attempts' => 'required|integer|min:1|max:99',
            'max_violations' => 'required|integer|min:1|max:99',
            'categories' => 'array',
            'categories.*.id' => 'required|exists:categories,id',
            'categories.*.question_count' => 'required|integer|min:0',
        ]);

        // Handle thumbnail upload
        if ($request->hasFile('thumbnail')) {
            $validated['thumbnail'] = $request->file('thumbnail')->store('tryouts', 'public');
        }

        $tryout->update($validated);

        // Sync categories
        if (isset($validated['categories'])) {
            $categoryData = collect($validated['categories'])->mapWithKeys(function ($cat, $index) {
                return [$cat['id'] => [
                    'question_count' => $cat['question_count'],
                    'sort_order' => $index,
                ]];
            })->toArray();

            $tryout->categories()->sync($categoryData);
        }

        // Calculate total questions
        $tryout->update(['total_questions' => $tryout->categories()->sum('question_count')]);

        return redirect()->route('admin.tryouts.index')
            ->with('success', 'Tryout berhasil diperbarui.');
    }

    /**
     * Delete tryout
     */
    public function destroy(Tryout $tryout): RedirectResponse
    {
        // Check for active sessions
        $activeSessions = $tryout->examSessions()->where('status', 'in_progress')->count();

        if ($activeSessions > 0) {
            return back()->withErrors(['error' => 'Tidak dapat menghapus tryout yang sedang dikerjakan.']);
        }

        $tryout->delete();

        return redirect()->route('admin.tryouts.index')
            ->with('success', 'Tryout berhasil dihapus.');
    }

    /**
     * Manage questions in tryout
     */
    public function questions(Tryout $tryout): Response
    {
        $tryout->load(['categories', 'questions.subcategory.category']);

        // Get available questions
        $categoryIds = $tryout->categories->pluck('id');
        $availableQuestions = Question::active()
            ->whereHas('subcategory', function ($query) use ($categoryIds) {
                $query->whereIn('category_id', $categoryIds);
            })
            ->whereNotIn('id', $tryout->questions->pluck('id'))
            ->with('subcategory.category')
            ->get();

        return Inertia::render('Admin/Tryouts/Questions', [
            'tryout' => [
                'id' => $tryout->id,
                'title' => $tryout->title,
                'total_questions' => $tryout->total_questions,
            ],
            'assignedQuestions' => $tryout->questions->map(fn($q) => [
                'id' => $q->id,
                'content' => Str::limit(strip_tags($q->content), 100),
                'type' => $q->type,
                'difficulty' => $q->difficulty,
                'category' => $q->subcategory->category->name,
                'subcategory' => $q->subcategory->name,
                'sort_order' => $q->pivot->sort_order,
            ]),
            'availableQuestions' => $availableQuestions->map(fn($q) => [
                'id' => $q->id,
                'content' => Str::limit(strip_tags($q->content), 100),
                'type' => $q->type,
                'difficulty' => $q->difficulty,
                'category' => $q->subcategory->category->name,
                'subcategory' => $q->subcategory->name,
            ]),
        ]);
    }

    /**
     * Sync questions to tryout
     */
    public function syncQuestions(Request $request, Tryout $tryout): RedirectResponse
    {
        $validated = $request->validate([
            'questions' => 'array',
            'questions.*.id' => 'required|exists:questions,id',
            'questions.*.sort_order' => 'required|integer|min:0',
        ]);

        $questionData = collect($validated['questions'])->mapWithKeys(function ($q) {
            return [$q['id'] => ['sort_order' => $q['sort_order']]];
        })->toArray();

        $tryout->questions()->sync($questionData);

        return back()->with('success', 'Soal berhasil diperbarui.');
    }

    /**
     * Auto-assign questions based on category settings
     */
    public function autoAssignQuestions(Tryout $tryout): RedirectResponse
    {
        $tryout->load('categories');

        $questions = [];
        $sortOrder = 0;

        foreach ($tryout->categories as $category) {
            $categoryQuestions = Question::active()
                ->whereHas('subcategory', function ($query) use ($category) {
                    $query->where('category_id', $category->id);
                })
                ->inRandomOrder()
                ->take($category->pivot->question_count)
                ->pluck('id')
                ->toArray();

            foreach ($categoryQuestions as $questionId) {
                $questions[$questionId] = ['sort_order' => $sortOrder++];
            }
        }

        $tryout->questions()->sync($questions);

        return back()->with('success', 'Soal berhasil di-assign secara otomatis.');
    }
}
