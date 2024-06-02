<?php

use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\FamilyController;
use App\Http\Controllers\Api\FamilyTypesController;
use App\Http\Controllers\Api\ImageUploadController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\HistoryController;
use App\Http\Controllers\Api\MessageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::prefix('tree/{type}')->name('tree.')->group(function() {
        Route::get('/', [FamilyController::class, 'index'])->name('index');
        Route::post('/', [FamilyController::class, 'store'])->name('store');
        Route::get('/{id}', [FamilyController::class, 'show'])->name('show');
        Route::delete('/{id}', [FamilyController::class, 'destroy'])->name('destroy');
        Route::post('/node/update', [FamilyController::class, 'nodeUpdate'])->name('node.update');
    });

    Route::prefix('family-type')->name('type.')->group(function() {
        Route::get('/', [FamilyTypesController::class, 'index'])->name('index');
        Route::get('/{type}', [FamilyTypesController::class, 'show'])->name('show');
    });
    Route::get('/user-family-type', [FamilyTypesController::class, 'userFamilyTypes'])->name('type.user');

    Route::post('/contact', [ContactController::class, 'send'])->name('contact.send');

    Route::get('/message', [MessageController::class, 'index'])->name('message.index');
    Route::post('/message', [MessageController::class, 'send'])->name('message.send');

    Route::middleware('admin')->prefix('admin')->name('admin.')->group(function() {
        Route::prefix('tree')->group(function() {
            Route::post('/', [FamilyController::class, 'store'])->name('tree.store');
            Route::put('/{id}', [FamilyController::class, 'update'])->name('tree.update');
        });

        Route::get('/tree-all', [FamilyController::class, 'all'])->name('tree-all');

        Route::post('/upload-image', [ImageUploadController::class, 'upload'])->name('upload.image');
        Route::apiResource('user', UserController::class);
        Route::get('/history', [HistoryController::class, 'index'])->name('history');
    });
});
