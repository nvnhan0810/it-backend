<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Admin\PostController as AdminPostController;
use App\Http\Controllers\Admin\TagController as AdminTagController;
use App\Http\Controllers\Admin\SeriesController as AdminSeriesController;
use App\Http\Controllers\Public\PostController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::get('/login', [AuthController::class, 'login'])->name('login');
    Route::get('/callback', [AuthController::class, 'callback'])->name('login.callback');
});

Route::get('/', [PostController::class, 'index'])->name('home');
Route::get('/posts/{slug}', [PostController::class, 'show'])->name('posts.show');


Route::get('/logout', [AuthController::class, 'logout'])->name('logout')->middleware('auth');

Route::prefix('admin')->name('admin.')->group(function () {

    Route::get('/', [AdminPostController::class, 'index'])->name('index');

    Route::resource('posts', AdminPostController::class)->except(['index', 'show']);

    Route::resource('tags', AdminTagController::class)->except(['show', 'create', 'store']);

    Route::resource('series', AdminSeriesController::class)->except(['show']);
})->middleware('auth');
