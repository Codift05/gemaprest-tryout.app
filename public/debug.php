<?php
/**
 * Debug Script - Cek konfigurasi hosting
 * HAPUS SETELAH SELESAI!
 */

echo "<pre style='background:#1e1e1e;color:#0f0;padding:20px;font-family:monospace;'>";
echo "=== DEBUG HOSTING ===\n\n";

// 1. PHP Version
echo "1. PHP Version: " . phpversion() . "\n";

// 2. Current directory
echo "2. Current Dir: " . __DIR__ . "\n";

// 3. Check Laravel paths
$paths = [
    'tryout folder' => __DIR__ . '/../tryout',
    'tryout/vendor' => __DIR__ . '/../tryout/vendor',
    'tryout/vendor/autoload.php' => __DIR__ . '/../tryout/vendor/autoload.php',
    'tryout/bootstrap/app.php' => __DIR__ . '/../tryout/bootstrap/app.php',
    'tryout/.env' => __DIR__ . '/../tryout/.env',
    'tryout/artisan' => __DIR__ . '/../tryout/artisan',
    'tryout/storage' => __DIR__ . '/../tryout/storage',
];

echo "\n3. Path Check:\n";
foreach ($paths as $name => $path) {
    $exists = file_exists($path) ? '✓ EXISTS' : '✗ NOT FOUND';
    echo "   - $name: $exists\n";
}

// 4. Check permissions
echo "\n4. Permission Check:\n";
$permPaths = [
    __DIR__ . '/../tryout/storage',
    __DIR__ . '/../tryout/bootstrap/cache',
];
foreach ($permPaths as $path) {
    if (file_exists($path)) {
        $perms = substr(sprintf('%o', fileperms($path)), -4);
        $writable = is_writable($path) ? 'Writable' : 'NOT Writable';
        echo "   - $path: $perms ($writable)\n";
    } else {
        echo "   - $path: NOT FOUND\n";
    }
}

// 5. Check .env content
echo "\n5. .env File:\n";
$envPath = __DIR__ . '/../tryout/.env';
if (file_exists($envPath)) {
    $env = file_get_contents($envPath);
    // Hide sensitive data
    $env = preg_replace('/PASSWORD=.*/', 'PASSWORD=***HIDDEN***', $env);
    $env = preg_replace('/KEY=.*/', 'KEY=***HIDDEN***', $env);
    echo $env;
} else {
    echo "   .env NOT FOUND!\n";
}

// 6. List tryout folder contents
echo "\n6. Tryout folder contents:\n";
$tryoutPath = __DIR__ . '/../tryout';
if (is_dir($tryoutPath)) {
    $files = scandir($tryoutPath);
    foreach ($files as $file) {
        if ($file != '.' && $file != '..') {
            echo "   - $file\n";
        }
    }
} else {
    echo "   Folder not found!\n";
}

// 7. List vendor folder
echo "\n7. Vendor folder check:\n";
$vendorPath = __DIR__ . '/../tryout/vendor';
if (is_dir($vendorPath)) {
    $files = array_slice(scandir($vendorPath), 0, 10);
    foreach ($files as $file) {
        if ($file != '.' && $file != '..') {
            echo "   - $file\n";
        }
    }
    echo "   ... and more\n";
} else {
    echo "   Vendor folder NOT FOUND!\n";
}

echo "\n=== END DEBUG ===\n";
echo "HAPUS FILE INI SETELAH SELESAI!\n";
echo "</pre>";
