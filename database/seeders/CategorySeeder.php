<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Subcategory;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'TPS',
                'color' => '#6366f1',
                'description' => 'Tes Potensi Skolastik',
                'subcategories' => [
                    ['name' => 'Penalaran Umum', 'description' => 'Kemampuan penalaran logis dan analitis'],
                    ['name' => 'Pengetahuan Umum', 'description' => 'Pengetahuan umum dan pemahaman'],
                    ['name' => 'Pemahaman Bacaan dan Menulis', 'description' => 'Kemampuan membaca dan menulis'],
                    ['name' => 'Pengetahuan Kuantitatif', 'description' => 'Kemampuan kuantitatif dasar'],
                ],
            ],
            [
                'name' => 'Literasi Bahasa Indonesia',
                'color' => '#ef4444',
                'description' => 'Tes Literasi Bahasa Indonesia',
                'subcategories' => [
                    ['name' => 'Membaca', 'description' => 'Pemahaman bacaan Bahasa Indonesia'],
                    ['name' => 'Menulis', 'description' => 'Kemampuan menulis Bahasa Indonesia'],
                ],
            ],
            [
                'name' => 'Literasi Bahasa Inggris',
                'color' => '#3b82f6',
                'description' => 'Tes Literasi Bahasa Inggris',
                'subcategories' => [
                    ['name' => 'Reading', 'description' => 'English reading comprehension'],
                    ['name' => 'Writing', 'description' => 'English writing skills'],
                ],
            ],
            [
                'name' => 'Penalaran Matematika',
                'color' => '#10b981',
                'description' => 'Tes Penalaran Matematika',
                'subcategories' => [
                    ['name' => 'Aljabar', 'description' => 'Materi aljabar dan persamaan'],
                    ['name' => 'Geometri', 'description' => 'Materi geometri dan pengukuran'],
                    ['name' => 'Statistika', 'description' => 'Materi statistika dan probabilitas'],
                    ['name' => 'Aritmatika', 'description' => 'Operasi dasar dan penalaran numerik'],
                ],
            ],
            [
                'name' => 'TKA Saintek',
                'color' => '#f59e0b',
                'description' => 'Tes Kemampuan Akademik Saintek',
                'subcategories' => [
                    ['name' => 'Matematika IPA', 'description' => 'Matematika untuk IPA'],
                    ['name' => 'Fisika', 'description' => 'Materi Fisika'],
                    ['name' => 'Kimia', 'description' => 'Materi Kimia'],
                    ['name' => 'Biologi', 'description' => 'Materi Biologi'],
                ],
            ],
            [
                'name' => 'TKA Soshum',
                'color' => '#8b5cf6',
                'description' => 'Tes Kemampuan Akademik Soshum',
                'subcategories' => [
                    ['name' => 'Sosiologi', 'description' => 'Materi Sosiologi'],
                    ['name' => 'Sejarah', 'description' => 'Materi Sejarah'],
                    ['name' => 'Geografi', 'description' => 'Materi Geografi'],
                    ['name' => 'Ekonomi', 'description' => 'Materi Ekonomi'],
                ],
            ],
        ];

        foreach ($categories as $categoryData) {
            $subcategories = $categoryData['subcategories'] ?? [];
            unset($categoryData['subcategories']);

            $category = Category::create($categoryData);

            foreach ($subcategories as $subcategoryData) {
                $subcategoryData['category_id'] = $category->id;
                Subcategory::create($subcategoryData);
            }
        }
    }
}
