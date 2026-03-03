<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<h2>Build Folder Check</h2>";

$buildPath = __DIR__ . '/build';
$vitePath = $buildPath . '/.vite';
$manifestPath = $vitePath . '/manifest.json';
$oldManifestPath = $buildPath . '/manifest.json';

echo "<h3>1. Checking paths:</h3>";
echo "<pre>";
echo "Build folder: $buildPath\n";
echo "Build exists: " . (is_dir($buildPath) ? "YES" : "NO") . "\n";
echo ".vite folder exists: " . (is_dir($vitePath) ? "YES" : "NO") . "\n";
echo "manifest.json in .vite: " . (file_exists($manifestPath) ? "YES" : "NO") . "\n";
echo "manifest.json in build root: " . (file_exists($oldManifestPath) ? "YES" : "NO") . "\n";
echo "</pre>";

echo "<h3>2. Build folder contents:</h3>";
if (is_dir($buildPath)) {
    echo "<pre>";
    $files = scandir($buildPath);
    foreach ($files as $file) {
        if ($file != '.' && $file != '..') {
            $fullPath = $buildPath . '/' . $file;
            $type = is_dir($fullPath) ? "[DIR]" : "[FILE]";
            echo "$type $file\n";
        }
    }
    echo "</pre>";
} else {
    echo "<p style='color:red'>Build folder not found!</p>";
}

echo "<h3>3. Assets folder contents:</h3>";
$assetsPath = $buildPath . '/assets';
if (is_dir($assetsPath)) {
    echo "<pre>";
    $files = scandir($assetsPath);
    $count = 0;
    foreach ($files as $file) {
        if ($file != '.' && $file != '..') {
            echo "$file\n";
            $count++;
            if ($count > 20) {
                echo "... and more files\n";
                break;
            }
        }
    }
    echo "</pre>";
} else {
    echo "<p style='color:red'>Assets folder not found!</p>";
}

echo "<h3>4. Manifest content:</h3>";
if (file_exists($manifestPath)) {
    echo "<pre style='max-height:300px;overflow:auto'>";
    echo htmlspecialchars(file_get_contents($manifestPath));
    echo "</pre>";
} elseif (file_exists($oldManifestPath)) {
    echo "<p>Found at old location (build/manifest.json)</p>";
    echo "<pre style='max-height:300px;overflow:auto'>";
    echo htmlspecialchars(file_get_contents($oldManifestPath));
    echo "</pre>";
} else {
    echo "<p style='color:red'>Manifest not found!</p>";
}

echo "<h3>5. .vite folder contents:</h3>";
if (is_dir($vitePath)) {
    echo "<pre>";
    $files = scandir($vitePath);
    foreach ($files as $file) {
        if ($file != '.' && $file != '..') {
            echo "$file\n";
        }
    }
    echo "</pre>";
} else {
    echo "<p style='color:orange'>.vite folder not found (might be in build root)</p>";
}
