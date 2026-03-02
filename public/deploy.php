<?php
/**
 * Deployment Helper Script
 * HAPUS FILE INI SETELAH SELESAI DEPLOY!
 */

// Security token - ganti dengan yang lebih aman
$secret = 'deploy2026secret';

if (!isset($_GET['token']) || $_GET['token'] !== $secret) {
    die('Unauthorized. Use ?token=YOUR_SECRET');
}

// Set the base path to Laravel
$basePath = __DIR__ . '/../tryout';

// Check if running from public_html (hosting) or local
if (!file_exists($basePath . '/artisan')) {
    $basePath = __DIR__ . '/..'; // Local development
}

if (!file_exists($basePath . '/artisan')) {
    die('Laravel not found. Check path.');
}

chdir($basePath);

$action = $_GET['action'] ?? 'info';

echo "<pre style='background:#1e1e1e;color:#fff;padding:20px;font-family:monospace;'>";
echo "=== Laravel Deployment Helper ===\n";
echo "Base Path: $basePath\n";
echo "Action: $action\n";
echo "================================\n\n";

// Scan for PHP action first
if ($action === 'scanphp') {
    echo "=== Scanning for PHP installations ===\n\n";
    
    // Common PHP paths on shared hosting
    $pathsToCheck = [
        '/usr/local/lsws/lsphp83/bin/php',
        '/usr/local/lsws/lsphp82/bin/php',
        '/usr/local/lsws/lsphp81/bin/php',
        '/opt/cpanel/ea-php83/root/usr/bin/php',
        '/opt/cpanel/ea-php82/root/usr/bin/php',
        '/opt/cpanel/ea-php81/root/usr/bin/php',
        '/opt/alt/php83/usr/bin/php',
        '/opt/alt/php82/usr/bin/php',
        '/usr/local/bin/php83',
        '/usr/local/bin/php82',
        '/usr/local/bin/php8.3',
        '/usr/local/bin/php8.2',
        '/usr/bin/php8.3',
        '/usr/bin/php8.2',
        '/usr/bin/php83',
        '/usr/bin/php82',
        '/usr/bin/php',
        'php',
    ];
    
    foreach ($pathsToCheck as $path) {
        $exists = ($path === 'php') ? true : file_exists($path);
        $version = shell_exec("$path -v 2>/dev/null | head -1");
        if ($version) {
            $status = $exists ? "[EXISTS]" : "[FOUND]";
            echo "$status $path\n";
            echo "   -> " . trim($version) . "\n\n";
        }
    }
    
    // Also check with 'which' and 'find'
    echo "\n=== System PHP locations ===\n";
    echo shell_exec("which php 2>&1") . "\n";
    echo shell_exec("ls -la /opt/cpanel/ea-php*/root/usr/bin/php 2>&1") . "\n";
    echo shell_exec("ls -la /usr/local/lsws/lsphp*/bin/php 2>&1") . "\n";
    echo shell_exec("ls -la /opt/alt/php*/usr/bin/php 2>&1") . "\n";
    
    echo "\n================================\n";
    echo "HAPUS FILE INI SETELAH SELESAI!\n";
    echo "</pre>";
    exit;
}

// DomaiNesia uses CloudLinux alt-php
$phpPaths = [
    '/opt/alt/php83/usr/bin/php',  // PHP 8.3.30 - CONFIRMED WORKING
    '/opt/alt/php82/usr/bin/php',  // PHP 8.2.30 - backup
];

$phpCmd = null;
foreach ($phpPaths as $path) {
    if (file_exists($path)) {
        $version = shell_exec("$path -v 2>&1 | head -1");
        if (strpos($version, '8.3') !== false || strpos($version, '8.2') !== false) {
            $phpCmd = $path;
            echo "Using PHP: $path\n";
            echo "Version: " . trim($version) . "\n\n";
            break;
        }
    }
}

if (!$phpCmd) {
    echo "WARNING: PHP 8.2+ not found in common paths!\n";
    echo "Run ?token=...&action=scanphp to find available PHP versions\n\n";
    $phpCmd = 'php'; // fallback
}

switch ($action) {
    case 'key':
        echo "Generating APP_KEY...\n";
        echo shell_exec("$phpCmd artisan key:generate --force 2>&1");
        break;
        
    case 'migrate':
        echo "Running migrations...\n";
        echo shell_exec("$phpCmd artisan migrate --force 2>&1");
        break;
        
    case 'seed':
        echo "Running seeders...\n";
        echo shell_exec("$phpCmd artisan db:seed --force 2>&1");
        break;
        
    case 'migrate-seed':
        echo "Running migrations and seeders...\n";
        echo shell_exec("$phpCmd artisan migrate --force 2>&1");
        echo "\n--- Seeding ---\n";
        echo shell_exec("$phpCmd artisan db:seed --force 2>&1");
        break;
        
    case 'fresh':
        echo "Fresh migration (WARNING: drops all tables)...\n";
        echo shell_exec("$phpCmd artisan migrate:fresh --force 2>&1");
        break;
        
    case 'fresh-seed':
        echo "Fresh migration with seeding...\n";
        echo shell_exec("$phpCmd artisan migrate:fresh --seed --force 2>&1");
        break;
        
    case 'cache':
        echo "Clearing and caching config...\n";
        echo shell_exec("$phpCmd artisan config:clear 2>&1");
        echo shell_exec("$phpCmd artisan config:cache 2>&1");
        echo shell_exec("$phpCmd artisan route:cache 2>&1");
        echo shell_exec("$phpCmd artisan view:cache 2>&1");
        break;
        
    case 'clear':
        echo "Clearing all caches...\n";
        echo shell_exec("$phpCmd artisan config:clear 2>&1");
        echo shell_exec("$phpCmd artisan cache:clear 2>&1");
        echo shell_exec("$phpCmd artisan route:clear 2>&1");
        echo shell_exec("$phpCmd artisan view:clear 2>&1");
        break;
        
    case 'storage-link':
        echo "Creating storage link...\n";
        echo shell_exec("$phpCmd artisan storage:link 2>&1");
        break;
    
    case 'debug':
        echo "=== DEBUG INFO ===\n\n";
        
        // Check .env
        $envFile = $basePath . '/.env';
        echo ".env exists: " . (file_exists($envFile) ? "YES" : "NO") . "\n";
        if (file_exists($envFile)) {
            $envContent = file_get_contents($envFile);
            preg_match('/APP_KEY=(.*)/', $envContent, $matches);
            $appKey = $matches[1] ?? '';
            echo "APP_KEY set: " . (strlen($appKey) > 10 ? "YES (" . substr($appKey, 0, 20) . "...)" : "NO/EMPTY") . "\n";
            preg_match('/APP_DEBUG=(.*)/', $envContent, $matches);
            echo "APP_DEBUG: " . ($matches[1] ?? 'not set') . "\n";
            preg_match('/APP_ENV=(.*)/', $envContent, $matches);
            echo "APP_ENV: " . ($matches[1] ?? 'not set') . "\n";
        }
        
        // Check storage permissions
        echo "\nStorage permissions:\n";
        $storagePath = $basePath . '/storage';
        echo "storage/ writable: " . (is_writable($storagePath) ? "YES" : "NO") . "\n";
        echo "storage/logs/ writable: " . (is_writable($storagePath . '/logs') ? "YES" : "NO") . "\n";
        echo "storage/framework/ writable: " . (is_writable($storagePath . '/framework') ? "YES" : "NO") . "\n";
        
        // Check bootstrap/cache
        $cachePath = $basePath . '/bootstrap/cache';
        echo "bootstrap/cache/ writable: " . (is_writable($cachePath) ? "YES" : "NO") . "\n";
        
        // Check storage link
        $storageLink = __DIR__ . '/storage';
        echo "\nStorage link exists: " . (file_exists($storageLink) ? "YES" : "NO") . "\n";
        
        // Check Laravel logs
        echo "\n=== Recent Laravel Errors ===\n";
        $logFile = $storagePath . '/logs/laravel.log';
        if (file_exists($logFile)) {
            $logs = file_get_contents($logFile);
            $lines = explode("\n", $logs);
            $lastLines = array_slice($lines, -50);
            echo implode("\n", $lastLines);
        } else {
            echo "No log file found\n";
        }
        break;
        
    case 'fix-permissions':
        echo "Fixing permissions...\n";
        echo shell_exec("chmod -R 775 $basePath/storage 2>&1");
        echo shell_exec("chmod -R 775 $basePath/bootstrap/cache 2>&1");
        echo "Done!\n";
        break;
        
    case 'info':
    default:
        echo "Available actions:\n";
        echo "- ?action=key         : Generate APP_KEY\n";
        echo "- ?action=migrate     : Run migrations\n";
        echo "- ?action=seed        : Run seeders\n";
        echo "- ?action=migrate-seed: Migrate + Seed\n";
        echo "- ?action=fresh       : Fresh migrate (drops tables!)\n";
        echo "- ?action=fresh-seed  : Fresh migrate + seed\n";
        echo "- ?action=cache       : Cache config/routes/views\n";
        echo "- ?action=clear       : Clear all caches\n";
        echo "- ?action=storage-link: Create storage symlink\n";
        echo "- ?action=debug       : Show debug info & errors\n";
        echo "- ?action=fix-permissions: Fix storage permissions\n";
        echo "\nUsage: deploy.php?token={$secret}&action=KEY\n";
        break;
}

echo "\n================================\n";
echo "HAPUS FILE INI SETELAH SELESAI!\n";
echo "</pre>";
