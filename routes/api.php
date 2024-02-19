<?php

use App\Http\Controllers\Api\FamilyController;
use App\Http\Controllers\Api\FamilyTypesController;
use App\Http\Controllers\Api\ImageUploadController;
use App\Http\Controllers\Api\UserController;
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
        Route::put('/{id}', [FamilyController::class, 'update'])->name('update');
        Route::delete('/{id}', [FamilyController::class, 'destroy'])->name('destroy');
        Route::post('/node/update', [FamilyController::class, 'nodeUpdate'])->name('node.update');
    });

    Route::prefix('family-type')->name('tree.')->group(function() {
        Route::get('/', [FamilyTypesController::class, 'index'])->name('index');
        Route::get('/{type}', [FamilyTypesController::class, 'show'])->name('show');
    });

    Route::post('/upload-image', [ImageUploadController::class, 'upload'])->name('upload.image');

    Route::middleware('admin')->prefix('admin')->name('admin.')->group(function() {
        Route::get('/tree-all', [FamilyController::class, 'all'])->name('tree-all');
        Route::apiResource('user', UserController::class);
    });
});
