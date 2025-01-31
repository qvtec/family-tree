<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\GoogleLoginController;
use App\Http\Controllers\FamilyController;
use App\Http\Controllers\ImageController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::middleware('guest')->group(function () {
    Route::get('/login', [GoogleLoginController::class, 'login'])->name('login');
    Route::get('/auth/google', [GoogleLoginController::class, 'redirectToGoogle'])->name('google.login');
    Route::get('/auth/google/callback', [GoogleLoginController::class, 'handleGoogleCallback'])->name('google.callback');
});

Route::middleware('auth')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Home');
    })->name('home');

    Route::get('/tree/{type}', [FamilyController::class, 'index'])->name('tree');
    Route::get('/contact', function () { return Inertia::render('Contact'); })->name('contact');
    Route::get('/message', function () { return Inertia::render('Message'); })->name('message');
    Route::get('/test', function () { return Inertia::render('Test'); })->name('test');

    Route::get('/images/{filename}', [ImageController::class, 'getImage'])->name('image.get');

    Route::middleware('admin')->prefix('admin')->name('admin.')->group(function() {
        Route::get('/user', function () { return Inertia::render('Admin/User'); })->name('user');
        Route::get('/history', function () { return Inertia::render('Admin/History'); })->name('history');
    });
});
