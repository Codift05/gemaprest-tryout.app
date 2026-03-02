<?php
/**
 * Fix .env file - Generate APP_KEY manually
 * HAPUS FILE INI SETELAH SELESAI!
 */

$secret = 'deploy2026secret';

if (!isset($_GET['token']) || $_GET['token'] !== $secret) {
    die('Unauthorized');
}

echo "<pre style='background:#1e1e1e;color:#fff;padding:20px;font-family:monospace;'>";
echo "=== Fix ENV Helper ===\n\n";

$basePath = __DIR__ . '/../tryout';
if (!file_exists($basePath . '/artisan')) {
    $basePath = __DIR__ . '/..';
}

$envFile = $basePath . '/.env';

if (!file_exists($envFile)) {
    die(".env file not found at: $envFile");
}

// Generate a new APP_KEY
$key = 'base64:' . base64_encode(random_bytes(32));

echo "Generated APP_KEY: $key\n\n";

// Read current .env
$envContent = file_get_contents($envFile);

// Check if APP_KEY line exists
if (preg_match('/^APP_KEY=.*$/m', $envContent)) {
    // Replace existing APP_KEY
    $envContent = preg_replace('/^APP_KEY=.*$/m', "APP_KEY=$key", $envContent);
    echo "Replaced existing APP_KEY line\n";
} else {
    // Add APP_KEY after APP_NAME
    $envContent = preg_replace('/^(APP_NAME=.*)$/m', "$1\nAPP_KEY=$key", $envContent);
    echo "Added new APP_KEY line\n";
}

// Write back
if (file_put_contents($envFile, $envContent)) {
    echo "\n.env file updated successfully!\n";
    
    // Verify
    $newContent = file_get_contents($envFile);
    preg_match('/^APP_KEY=(.*)$/m', $newContent, $matches);
    echo "\nVerification - APP_KEY is now: " . ($matches[1] ?? 'NOT FOUND') . "\n";
} else {
    echo "\nERROR: Could not write to .env file!\n";
}

// Also create storage link manually
$action = $_GET['action'] ?? '';

if ($action === 'fix-perms') {
    echo "\n=== Fixing Permissions ===\n";
    
    // Fix vendor permissions
    $vendorPath = $basePath . '/vendor';
    if (is_dir($vendorPath)) {
        $iterator = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($vendorPath, RecursiveDirectoryIterator::SKIP_DOTS),
            RecursiveIteratorIterator::SELF_FIRST
        );
        
        $count = 0;
        foreach ($iterator as $item) {
            if ($item->isDir()) {
                @chmod($item->getPathname(), 0755);
            } else {
                @chmod($item->getPathname(), 0644);
            }
            $count++;
        }
        echo "Fixed permissions for $count files/folders in vendor/\n";
    }
    
    // Fix storage and bootstrap/cache
    @chmod($basePath . '/storage', 0775);
    @chmod($basePath . '/bootstrap/cache', 0775);
    
    $storageDirs = ['app', 'app/public', 'framework', 'framework/cache', 'framework/sessions', 'framework/views', 'logs'];
    foreach ($storageDirs as $dir) {
        @chmod($basePath . '/storage/' . $dir, 0775);
    }
    
    echo "Fixed storage and bootstrap/cache permissions\n";
    echo "\nDone! Try accessing the site again.\n";
}

if ($action === 'storage') {
    echo "\n=== Creating Storage Link ===\n";
    $publicStorage = __DIR__ . '/storage';
    $appStorage = $basePath . '/storage/app/public';
    
    if (file_exists($publicStorage)) {
        echo "Storage link already exists\n";
    } else {
        if (symlink($appStorage, $publicStorage)) {
            echo "Storage link created successfully!\n";
        } else {
            echo "Could not create symlink. Try manual creation in cPanel File Manager.\n";
        }
    }
}

echo "\n================================\n";
echo "Actions:\n";
echo "- This script (no action): Generate APP_KEY\n";
echo "- ?action=storage: Create storage symlink\n";
echo "\nHAPUS FILE INI SETELAH SELESAI!\n";
echo "</pre>";
