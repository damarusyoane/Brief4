<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;

// Public route
Route::post('/login', [AuthController::class, 'login']);

Route::post('/register', [AuthController::class, 'register']);

// Protected route
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Logout
Route::post('/logout', function (Request $request) {
    // Revoke the current token
    $request->user()->currentAccessToken()->delete();
    
    return response()->json([
        'message' => 'Successfully logged out'
    ]);
})->middleware('auth:sanctum');



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/test', function() {
    return response()->json(['message' => 'API works!']);
});