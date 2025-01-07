<?php

use App\Http\Controllers\Admin\PostController;
use App\Http\Middleware\OpenIdMiddleware;
use Illuminate\Support\Facades\Route;



Route::middleware([OpenIdMiddleware::class])->prefix('admin')->group(function() {
    Route::apiResource('/posts', PostController::class);
});
