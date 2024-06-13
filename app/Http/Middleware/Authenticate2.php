<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Authenticate2
{
    public function handle(Request $request, Closure $next)
    {
        
        if (Auth::check()) {
            return response()->json(['authenticated' => true]);
        }
         
        return response()->json(['authenticated' => false]);
    }
}
