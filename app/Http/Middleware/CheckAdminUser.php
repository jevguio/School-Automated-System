<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\User;
use Illuminate\Support\Facades\DB; 
class CheckAdminUser
{
    public function handle($request, Closure $next)
    {
        // Check if an admin user exists

        try {
            // Attempt to run a simple query
            DB::connection()->getPdo();
            $adminUserExists = User::where('type', 'admin')->exists();

            if (!$adminUserExists) {
                // No admin user exists, redirect to setup or perform appropriate action
                return redirect()->route('setup');
            }
        } catch (QueryException $e) {
            // If it fails, assume the database does not exist
            // Run the migrations to create the database and tables
            Artisan::call('migrate', ['--force' => true]);
        }


        return $next($request);
    }
}
