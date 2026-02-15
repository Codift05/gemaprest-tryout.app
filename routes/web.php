<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\LeaderboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TryoutController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\QuestionController;
use App\Http\Controllers\Admin\TryoutController as AdminTryoutController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Landing Page
Route::get('/', function () {
    if (auth()->check()) {
        return auth()->user()->isAdmin()
            ? redirect()->route('admin.dashboard')
            : redirect()->route('dashboard');
    }
    return inertia('Welcome');
})->name('home');

// Auth Routes
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);

    // Hidden admin login route (no route name for security)
    Route::get('/admin-portal-secret', function () {
        return inertia('Auth/AdminLogin');
    });
});

Route::post('/logout', [AuthController::class, 'logout'])
    ->middleware('auth')
    ->name('logout');

// Student Routes
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Tryout Listing
    Route::get('/tryouts', [TryoutController::class, 'index'])->name('tryouts.index');
    Route::get('/tryout/{tryout:slug}', [TryoutController::class, 'show'])->name('tryout.show');

    // Exam Routes
    Route::prefix('exam')->name('exam.')->group(function () {
        Route::get('/server-time', [ExamController::class, 'serverTime'])->name('server-time');
        Route::post('/{tryout}/start', [ExamController::class, 'start'])->name('start');
        Route::get('/session/{session}', [ExamController::class, 'take'])->name('take');
        Route::post('/session/{session}/answer', [ExamController::class, 'saveAnswer'])->name('save-answer');
        Route::post('/session/{session}/violation', [ExamController::class, 'reportViolation'])->name('report-violation');
        Route::post('/session/{session}/submit', [ExamController::class, 'submit'])->name('submit');
        Route::get('/session/{session}/result', [ExamController::class, 'result'])->name('result');
        Route::get('/session/{session}/review', [ExamController::class, 'review'])->name('review');
    });

    // Leaderboard Routes
    Route::prefix('leaderboard')->name('leaderboard.')->group(function () {
        Route::get('/{tryout:slug}', [LeaderboardController::class, 'show'])->name('show');
        Route::get('/{tryout:slug}/data', [LeaderboardController::class, 'data'])->name('data');
    });

    // History
    Route::get('/history', function () {
        $sessions = \App\Models\ExamSession::where('user_id', auth()->id())
            ->whereIn('status', ['completed', 'timeout', 'violated'])
            ->with('tryout:id,title,slug')
            ->orderByDesc('finished_at')
            ->paginate(20);

        return inertia('History/Index', [
            'sessions' => $sessions,
        ]);
    })->name('history.index');

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
});

// Admin Routes
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    // Dashboard
    Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');

    // Categories
    Route::resource('categories', CategoryController::class)->except(['show']);
    Route::post('/categories/{category}/subcategories', [CategoryController::class, 'storeSubcategory'])
        ->name('categories.subcategories.store');
    Route::patch('/subcategories/{subcategory}', [CategoryController::class, 'updateSubcategory'])
        ->name('subcategories.update');
    Route::delete('/subcategories/{subcategory}', [CategoryController::class, 'destroySubcategory'])
        ->name('subcategories.destroy');

    // Questions
    Route::resource('questions', QuestionController::class)->except(['show']);
    Route::delete('/questions/bulk', [QuestionController::class, 'bulkDestroy'])->name('questions.bulk-destroy');
    Route::post('/questions/import', [QuestionController::class, 'import'])->name('questions.import');

    // Tryouts
    Route::resource('tryouts', AdminTryoutController::class)->except(['show']);
    Route::get('/tryouts/{tryout}/questions', [AdminTryoutController::class, 'questions'])->name('tryouts.questions');
    Route::post('/tryouts/{tryout}/questions/add', [AdminTryoutController::class, 'addQuestions'])->name('tryouts.questions.add');
    Route::post('/tryouts/{tryout}/questions', [AdminTryoutController::class, 'syncQuestions'])->name('tryouts.sync-questions');
    Route::post('/tryouts/{tryout}/auto-assign', [AdminTryoutController::class, 'autoAssignQuestions'])->name('tryouts.auto-assign');

    // Users
    Route::resource('users', UserController::class)->except(['show']);
    Route::post('/users/{user}/toggle-active', [UserController::class, 'toggleActive'])->name('users.toggle-active');

    // Reports
    Route::get('/reports', [\App\Http\Controllers\Admin\ReportController::class, 'index'])->name('reports.index');
    Route::get('/reports/violations', [\App\Http\Controllers\Admin\ReportController::class, 'violations'])->name('reports.violations');

    // Settings
    Route::get('/settings', [\App\Http\Controllers\Admin\SettingController::class, 'index'])->name('settings.index');
    Route::post('/settings', [\App\Http\Controllers\Admin\SettingController::class, 'update'])->name('settings.update');
});
