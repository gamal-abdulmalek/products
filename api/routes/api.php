<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\controllers\ProductController;
use App\Http\Controllers\RolePermissionController;
use App\Http\Controllers\AuthController;
use Spatie\Permission\Models\Permission;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::post('/forgot-password', [AuthController::class, 'sendOtp']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);

Route::apiResource("products",ProductController::class);

Route::get('/roles', [RolePermissionController::class, 'getRoles']);
Route::get('/permissions', [RolePermissionController::class, 'getPermissions']);




