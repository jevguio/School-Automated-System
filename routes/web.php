<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request; 
 
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RegisterController;

// API routes for authentication

Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth')->get('/logout', [AuthController::class, 'logout']);

Route::post('/register', [RegisterController::class, 'register']);
Route::get('/', function () {
    return view('main');
}); 
Route::get('/login', function () {
    if (Auth::check()) { 
        return response()->json(['authenticated' => true]);
    } else {
        return response()->json(['authenticated' => false]);
    }
})->name('login'); 

// Route definition
Route::middleware('auth')->get('/check-auth', function () {
    
    if (Auth::check()) { 
        $user = Auth::user();
        return response()->json(['authenticated' => true, 'user' => $user]);
    } else {
        return response()->json(['authenticated' => false]);
    }
});
