<?php

use App\Http\Controllers\Api\AgentController;
use App\Http\Controllers\Api\AnnouncementController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\FactoryController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\SettingController;
use App\Http\Controllers\Api\UploadController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);

Route::get('/settings', [SettingController::class, 'show']);
Route::apiResource('factories', FactoryController::class)->only(['index', 'show']);
Route::apiResource('products', ProductController::class)->only(['index', 'show']);
Route::apiResource('agents', AgentController::class)->only(['index', 'show']);
Route::apiResource('announcements', AnnouncementController::class)->only(['index', 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::put('/account', [AuthController::class, 'updateProfile']);
    Route::post('/upload', [UploadController::class, 'store']);

    Route::put('/settings', [SettingController::class, 'update']);
    Route::apiResource('factories', FactoryController::class)->except(['index', 'show']);
    Route::apiResource('products', ProductController::class)->except(['index', 'show']);
    Route::apiResource('agents', AgentController::class)->except(['index', 'show']);
    Route::apiResource('announcements', AnnouncementController::class)->except(['index', 'show']);
});
