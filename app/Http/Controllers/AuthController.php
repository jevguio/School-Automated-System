<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        try{
            if (Auth::attempt($credentials)) {
                // If the credentials are valid, manually create a token for the user
                $user = Auth::user();
                $token = $user->createToken('AuthToken')->plainTextToken;
                return response()->json([
                    'message' => 'Login successful',
                    'token' => $token,
                ], 200);
            }
    
            return response()->json(['message' => 'Invalid credentials']);
        }catch(\Exception  $exception){

            return response()->json(['error' => $exception->getMessage()]);
        }
    }

    public function logout(Request $request)
    { 
        // Check if the user is authenticated
        if ($user = Auth::user()) {
            // If the user is authenticated, delete their tokens 
            
            // Then logout the user
            Auth::logout();
            
            return response()->json(['message' => 'Successfully logged out']);
        } else {
            // If the user is not authenticated, return an error response
            return response()->json(['error' => 'User is not authenticated'], 401);
        }
    }
}
