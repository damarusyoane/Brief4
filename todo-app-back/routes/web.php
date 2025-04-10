<?php

use Illuminate\Support\Facades\Route;
use App\Models\User;
use App\Http\Controllers\AuthController;

Route::get('/', function () {
    return view('welcome');
});


// Temporary route - REMOVE AFTER USE!
Route::get('/create-user', function() {
    $user = User::create([
        'name' => 'Temp User',
        'email' => 'temp@example.com',
        'password' => bcrypt('temppassword'),
    ]);
    
    return response()->json([
        'message' => 'User created',
        'user_id' => $user->id
    ]);
});
Route::post('/logout', [AuthController::class, 'logout'])
     ->name('logout'); 