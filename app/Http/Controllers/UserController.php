<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
class UserController extends Controller
{
    //
    public function changeProfile(Request $request)
    {
        
        if (!$request->ajax()) {
            return response()->json([
                'error' => 'forbidden'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'profile_path' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Validate profile picture
        ]);
    

        try {
            $user = Auth::user();

            // Handle profile picture upload
            if ($request->hasFile('profile_path')) {
                $profile_path = $request->file('profile_path');
                $profilePicPath = $profile_path->store('profile_path', 'public');
                $user->profile_path = $profilePicPath;
                $user->save();
            }

            return response()->json([
                'redirect' => route('setup'),
                'message' => 'Setup completed.',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 500); // Return error with HTTP status 500 (Internal Server Error)
        }
    }
   
}
