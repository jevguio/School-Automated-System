<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schema;

class EnsureDatabaseExists
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (!$this->databaseExists()) {
            Artisan::call('migrate', ['--force' => true]);
        }

        return $next($request);
    }

    /**
     * Check if the database exists by trying to get a connection.
     *
     * @return bool
     */
    protected function databaseExists()
    {
        try {
            DB::connection()->getPdo();
            return Schema::hasTable('migrations'); // Check if the migrations table exists
        } catch (\Exception $e) {
            return false;
        }
    }
}
