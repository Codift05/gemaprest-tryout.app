<?php
/**
 * Direct Debug - Shows actual Laravel error
 * HAPUS FILE INI SETELAH SELESAI!
 */

$secret = 'deploy2026secret';

if (!isset($_GET['token']) || $_GET['token'] !== $secret) {
    die('Unauthorized');
}

ini_set('display_errors', 1);
error_reporting(E_ALL);

echo "<pre style='background:#1e1e1e;color:#fff;padding:20px;font-family:monospace;'>";
echo "=== Direct Laravel Debug ===\n\n";

$basePath = __DIR__ . '/../tryout';
if (!file_exists($basePath . '/artisan')) {
    $basePath = __DIR__ . '/..';
}

echo "Base Path: $basePath\n";
echo "Artisan exists: " . (file_exists($basePath . '/artisan') ? 'YES' : 'NO') . "\n\n";

// Check critical files
echo "=== Critical Files ===\n";
$criticalFiles = [
    '/vendor/autoload.php',
    '/bootstrap/app.php',
    '/config/app.php',
    '/.env',
];

foreach ($criticalFiles as $file) {
    $fullPath = $basePath . $file;
    $exists = file_exists($fullPath);
    echo $file . ": " . ($exists ? "EXISTS" : "MISSING!") . "\n";
}

// Read .env and show important values
echo "\n=== .env Contents ===\n";
$envFile = $basePath . '/.env';
if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES);
    foreach ($lines as $line) {
        if (empty(trim($line)) || strpos($line, '#') === 0) continue;
        // Hide sensitive values partially
        if (preg_match('/^(DB_PASSWORD|APP_KEY)=(.*)$/', $line, $m)) {
            $val = $m[2];
            echo $m[1] . "=" . substr($val, 0, 10) . "..." . "\n";
        } else {
            echo $line . "\n";
        }
    }
}

// Check database connection
echo "\n=== Database Connection Test ===\n";
$envContent = file_get_contents($envFile);
preg_match('/DB_HOST=(.*)/', $envContent, $m); $dbHost = trim($m[1] ?? 'localhost');
preg_match('/DB_DATABASE=(.*)/', $envContent, $m); $dbName = trim($m[1] ?? '');
preg_match('/DB_USERNAME=(.*)/', $envContent, $m); $dbUser = trim($m[1] ?? '');
preg_match('/DB_PASSWORD=(.*)/', $envContent, $m); $dbPass = trim($m[1] ?? '');

try {
    $pdo = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUser, $dbPass);
    echo "Database connection: SUCCESS\n";
    
    // Check tables
    $tables = $pdo->query("SHOW TABLES")->fetchAll(PDO::FETCH_COLUMN);
    echo "Tables found: " . count($tables) . "\n";
    if (count($tables) > 0) {
        echo "Tables: " . implode(", ", array_slice($tables, 0, 10)) . "\n";
    }
} catch (Exception $e) {
    echo "Database connection: FAILED\n";
    echo "Error: " . $e->getMessage() . "\n";
}

// Try to boot Laravel
echo "\n=== Laravel Boot Test ===\n";
try {
    require $basePath . '/vendor/autoload.php';
    echo "Autoload: OK\n";
    
    $app = require_once $basePath . '/bootstrap/app.php';
    echo "Bootstrap: OK\n";
    
    $kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
    echo "Kernel: OK\n";
    
    echo "\nLaravel should work! The issue might be in routing or views.\n";
    
} catch (Throwable $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
    echo "File: " . $e->getFile() . "\n";
    echo "Line: " . $e->getLine() . "\n";
    echo "\nStack trace:\n";
    echo $e->getTraceAsString();
}

// Check latest log
echo "\n\n=== Latest Log Errors ===\n";
$logFile = $basePath . '/storage/logs/laravel.log';
if (file_exists($logFile)) {
    $content = file_get_contents($logFile);
    // Get last error block
    $lines = explode("\n", $content);
    $lastLines = array_slice($lines, -100);
    
    // Find error lines
    foreach ($lastLines as $line) {
        if (strpos($line, 'ERROR') !== false || strpos($line, 'Exception') !== false) {
            echo $line . "\n";
        }
    }
} else {
    echo "No log file\n";
}

echo "\n================================\n";
echo "HAPUS FILE INI SETELAH SELESAI!\n";
echo "</pre>";
