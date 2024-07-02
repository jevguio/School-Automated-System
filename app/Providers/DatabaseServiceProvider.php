<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\File;

class DatabaseServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // $this->checkAndCreateDatabase();
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    protected function checkAndCreateDatabase()
    {
        $envFile = app()->environmentFilePath();
        $str = File::get($envFile);

        // Parse the .env file content
        $dbHost = $this->getEnvValue($str, 'DB_HOST');
        $dbDatabase = $this->getEnvValue($str, 'DB_DATABASE');
        $dbUsername = $this->getEnvValue($str, 'DB_USERNAME');
        $dbPassword = $this->getEnvValue($str, 'DB_PASSWORD');

        // Set the custom database configuration
        Config::set('database.connections.custom', [
            'driver' => 'mysql',
            'host' => $dbHost,
            'database' => $dbDatabase,
            'username' => $dbUsername,
            'password' => $dbPassword,
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
            'strict' => true,
            'engine' => null,
        ]);

        // Clear the config cache to apply the new configuration
        Artisan::call('config:clear');

        // Try to connect to the custom database
        try {
            DB::connection($dbDatabase)->getPdo();
        } catch (\Exception $e) {
            // If connection fails, it means the database does not exist, so we create it
            $this->createDatabase($dbHost, $dbDatabase, $dbUsername, $dbPassword);
            // Reconnect after creating the database
            
            Artisan::call('migrate', [ 
                '--force' => true,
            ]);
            DB::purge('custom');
            DB::reconnect('custom');
        }

        // Check if the migrations table exists to determine if we need to run migrations
        if (!DB::connection('custom')->getSchemaBuilder()->hasTable('migrations')) {
            // Run migrations
            Artisan::call('migrate', [ 
                '--force' => true,
            ]);
        }
    }

    protected function createDatabase($host, $database, $username, $password)
    {
        $charset = 'utf8mb4';
        $collation = 'utf8mb4_unicode_ci';

        $pdo = new \PDO("mysql:host=$host", $username, $password);
        $pdo->exec("CREATE DATABASE IF NOT EXISTS `$database` CHARACTER SET $charset COLLATE $collation;");
    }
    protected function getEnvValue($str, $key)
    {
        preg_match("/^$key=(.*)$/m", $str, $matches);
        return $matches[1] ?? null;
    }
}
