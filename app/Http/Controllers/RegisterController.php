<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // If validation fails, return a 422 response with the errors
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        try {
            // Create the user
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            // Create the token
            $token = $user->createToken('AuthToken')->plainTextToken;

            // Return a successful response with the token
            return response()->json([
                'message' => 'Registration successful',
                'token' => $token,
            ], 201);

        } catch (\Exception $e) {
            // Log the exception
            \Log::error('Error during registration: ' . $e->getMessage());

            // Return a 500 response with the exception message
            return response()->json([
                'message' => 'Registration failed',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
