<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EnvController extends Controller
{
    public function index(Request $request)
    {
        // Check if the request is an AJAX request
        if ($request->ajax()) {
            return response()->json([
                'APP_NAME' => env('APP_NAME'),
                'DB_HOST' => env('DB_HOST'),
                'DB_PORT' => env('DB_PORT'),
                'DB_DATABASE' => env('DB_DATABASE'),
                'DB_USERNAME' => env('DB_USERNAME'),
                'DB_PASSWORD' => env('DB_PASSWORD'),  
            ]);
        }

        // Return a 403 Forbidden response for non-AJAX requests
        return response()->json(['error' => 'Forbidden'], 403);
    }
}
