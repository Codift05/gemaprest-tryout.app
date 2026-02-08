<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Subcategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    /**
     * Display listing of categories
     */
    public function index(): Response
    {
        $categories = Category::withCount(['subcategories', 'questions' => function ($query) {
            // Count questions through subcategories
        }])
            ->with(['subcategories' => function ($query) {
                $query->withCount('questions')->ordered();
            }])
            ->ordered()
            ->get();

        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories->map(fn($cat) => [
                'id' => $cat->id,
                'name' => $cat->name,
                'slug' => $cat->slug,
                'description' => $cat->description,
                'color' => $cat->color,
                'sort_order' => $cat->sort_order,
                'is_active' => $cat->is_active,
                'subcategories_count' => $cat->subcategories_count,
                'subcategories' => $cat->subcategories->map(fn($sub) => [
                    'id' => $sub->id,
                    'name' => $sub->name,
                    'slug' => $sub->slug,
                    'questions_count' => $sub->questions_count,
                    'is_active' => $sub->is_active,
                ]),
            ]),
        ]);
    }

    /**
     * Store new category
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'color' => 'nullable|string|max:20',
            'sort_order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        Category::create($validated);

        return back()->with('success', 'Kategori berhasil dibuat.');
    }

    /**
     * Update category
     */
    public function update(Request $request, Category $category): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'color' => 'nullable|string|max:20',
            'sort_order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        $category->update($validated);

        return back()->with('success', 'Kategori berhasil diperbarui.');
    }

    /**
     * Delete category
     */
    public function destroy(Category $category): RedirectResponse
    {
        if ($category->subcategories()->exists()) {
            return back()->withErrors(['error' => 'Tidak dapat menghapus kategori yang memiliki subkategori.']);
        }

        $category->delete();

        return back()->with('success', 'Kategori berhasil dihapus.');
    }

    /**
     * Store new subcategory
     */
    public function storeSubcategory(Request $request, Category $category): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'sort_order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        $category->subcategories()->create($validated);

        return back()->with('success', 'Subkategori berhasil dibuat.');
    }

    /**
     * Update subcategory
     */
    public function updateSubcategory(Request $request, Subcategory $subcategory): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'sort_order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        $subcategory->update($validated);

        return back()->with('success', 'Subkategori berhasil diperbarui.');
    }

    /**
     * Delete subcategory
     */
    public function destroySubcategory(Subcategory $subcategory): RedirectResponse
    {
        if ($subcategory->questions()->exists()) {
            return back()->withErrors(['error' => 'Tidak dapat menghapus subkategori yang memiliki soal.']);
        }

        $subcategory->delete();

        return back()->with('success', 'Subkategori berhasil dihapus.');
    }
}
