<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\SetupController;
use App\Http\Controllers\EnvController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\DepartmentsController;
use App\Http\Controllers\CourseController;
// API routes for authentication

Route::get('/env', [EnvController::class, 'index']);
Route::middleware('auth')->get('/logout', [AuthController::class, 'logout']);


Route::post('/post/submit', [PostController::class, 'store'])->name('post.submit'); 
Route::post('/post/get', [PostController::class, 'get'])->name('post.get'); 


Route::post('/setup/submit', [SetupController::class, 'setup'])->name('setup.submit'); 
Route::post('/setup/SetupDB', [SetupController::class, 'SetupDB'])->name('SetupDB');
Route::post('/setup/CheckDB', [SetupController::class, 'CheckDB'])->name('CheckDB');  

Route::post('/getDepartments', [DepartmentsController::class, 'index'])->name('getDepartments');  
Route::post('/getCourse', [CourseController::class, 'index'])->name('getCourse');  

Route::get('/setup', function () {
    $adminUserExists = \App\Models\User::where('type', 'admin')->exists();

    if ($adminUserExists) {
        return redirect()->route('main');
        return $adminUserExists;
    } else {

        return view('setup');
    }
})->name('setup');



Route::get('/', function () {
    try {
        // Attempt to run a simple query
        DB::connection()->getPdo();
        $adminUserExists = \App\Models\User::where('type', 'admin')->exists();

        if (!$adminUserExists) {
            // No admin user exists, redirect to setup or perform appropriate action
            return redirect()->route('setup');
        }
    } catch (QueryException $e) {
        // If it fails, assume the database does not exist
        // Run the migrations to create the database and tables
        Artisan::call('migrate', ['--force' => true]);
    }

    return view('main');
})->name("main");



Route::post('/profile/saveImage',[UserController::class,"changeProfile"])->name("saveImage");
Route::middleware([\App\Http\Middleware\CheckAdminUser::class])->group(function () {

    
    Route::post('/login', [AuthController::class, 'login']);
    
    Route::get('/login', function () {
        if (Auth::check()) {
            return response()->json(['authenticated' => true]);
        } else {
            return response()->json(['authenticated' => false]);
        }
    })->name('login');

    Route::post('/register', [RegisterController::class, 'register']);
});



Route::post('/check-auth', function () {
    $adminUserExists = \App\Models\User::where('type', 'admin')->exists();

    if ($adminUserExists) {
        if (Auth::check()) {
            $user = Auth::user();
            return response()->json(['isSetup' => true, 'authenticated' => true, 'user' => $user]);
        } else {
            return response()->json(['isSetup' => true, 'authenticated' => false, 'user' => null]);
        }
    } else {
        return response()->json(['isSetup' => false, 'authenticated' => false, 'user' => null]);
    }
});
