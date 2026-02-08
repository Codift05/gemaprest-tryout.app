<?php

namespace Database\Seeders;

use App\Models\Question;
use App\Models\Subcategory;
use App\Models\User;
use Illuminate\Database\Seeder;

class QuestionSeeder extends Seeder
{
    public function run(): void
    {
        $subcategories = Subcategory::with('category')->get()->keyBy('name');
        $admin = User::where('email', 'admin@tryout.test')->first();
        $adminId = $admin ? $admin->id : 1;

        $questions = [
            ['subcategory' => 'Penalaran Umum', 'content' => 'Jika semua A adalah B, dan semua B adalah C, maka...', 'options' => json_encode([['key' => 'A', 'text' => 'Semua A adalah C'], ['key' => 'B', 'text' => 'Semua C adalah A'], ['key' => 'C', 'text' => 'Beberapa A adalah C'], ['key' => 'D', 'text' => 'Tidak ada A yang C'], ['key' => 'E', 'text' => 'Semua C adalah B']]), 'correct_answer' => 'A', 'explanation' => 'Silogisme: A subset B, B subset C, maka A subset C.', 'difficulty' => 'easy'],
            ['subcategory' => 'Fisika', 'content' => 'Energi kinetik benda 2 kg dengan kecepatan 10 m/s adalah...', 'options' => json_encode([['key' => 'A', 'text' => '50 J'], ['key' => 'B', 'text' => '100 J'], ['key' => 'C', 'text' => '150 J'], ['key' => 'D', 'text' => '200 J'], ['key' => 'E', 'text' => '250 J']]), 'correct_answer' => 'B', 'explanation' => 'Ek = 0.5 mv^2 = 0.5 x 2 x 100 = 100 J', 'difficulty' => 'easy'],
            ['subcategory' => 'Biologi', 'content' => 'Organel sel yang berperan dalam sintesis protein adalah...', 'options' => json_encode([['key' => 'A', 'text' => 'Mitokondria'], ['key' => 'B', 'text' => 'Ribosom'], ['key' => 'C', 'text' => 'Lisosom'], ['key' => 'D', 'text' => 'Badan Golgi'], ['key' => 'E', 'text' => 'Vakuola']]), 'correct_answer' => 'B', 'explanation' => 'Ribosom adalah organel sel untuk sintesis protein.', 'difficulty' => 'easy'],
            ['subcategory' => 'Sejarah', 'content' => 'Proklamasi kemerdekaan Indonesia dibacakan pada tanggal...', 'options' => json_encode([['key' => 'A', 'text' => '17 Agustus 1944'], ['key' => 'B', 'text' => '17 Agustus 1945'], ['key' => 'C', 'text' => '18 Agustus 1945'], ['key' => 'D', 'text' => '17 September 1945'], ['key' => 'E', 'text' => '17 Oktober 1945']]), 'correct_answer' => 'B', 'explanation' => 'Proklamasi kemerdekaan dibacakan 17 Agustus 1945.', 'difficulty' => 'easy'],
        ];

        foreach ($questions as $q) {
            $subcategoryName = $q['subcategory'];
            unset($q['subcategory']);
            if (isset($subcategories[$subcategoryName])) {
                $q['subcategory_id'] = $subcategories[$subcategoryName]->id;
                $q['created_by'] = $adminId;
                Question::create($q);
            }
        }
    }
}