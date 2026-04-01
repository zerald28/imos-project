<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

require __DIR__.'/../vendor/autoload.php';

// TEMP DEBUG - remove after confirming
echo "<pre>";
echo "lambda dir: " . __DIR__ . "\n";
echo "base path: " . dirname(__DIR__) . "\n";
echo "views dir exists: " . (is_dir(__DIR__.'/../resources/views') ? 'YES' : 'NO') . "\n";
echo "app.blade.php exists: " . (file_exists(__DIR__.'/../resources/views/app.blade.php') ? 'YES' : 'NO') . "\n";
echo "files in project root:\n";
foreach (scandir(dirname(__DIR__)) as $f) {
    echo "  $f\n";
}
echo "</pre>";
exit;

/** @var Application $app */
$app = require_once __DIR__.'/../bootstrap/app.php';

$app->handleRequest(Request::capture());