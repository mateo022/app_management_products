<?php

use App\Http\Controllers\UserController;
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
Route::apiResource('products', \App\Http\Controllers\ProductController::class)
                    ->middleware('auth:sanctum');

Route::apiResource('categories', \App\Http\Controllers\CategoryController::class)
                    ->middleware('auth:sanctum');

Route::apiResource('orders', \App\Http\Controllers\OrderController::class)
                    ->middleware('auth:sanctum');
                    
Route::post('users', [UserController::class, 'store']);

Route::apiResource('users', UserController::class)
                        ->except(['store']) 
                        ->middleware('auth:sanctum');

Route::post('/login', [\App\Http\Controllers\LoginController::class, 'login']);
