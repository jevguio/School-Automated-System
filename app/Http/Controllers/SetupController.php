<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class SetupController extends Controller
{
    public function setup(Request $request)
    {
        // Validate inputs
        $validator = Validator::make($request->all(), [ 
            'user_name' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8',
            'app_name' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()->first(),
            ], 422); // Return validation errors with HTTP status 422 (Unprocessable Entity)
        }

        try {
            $user = new User();
            $user->name = $request->input('user_name');
            $user->email = $request->input('email');
            $user->password = Hash::make($request->input('password'));
            $user->type = 'admin';
            $user->save();
            $envFile = app()->environmentFilePath();
            $str = file_get_contents($envFile);

            $envData = [ 
                'APP_NAME' => $request->input('app_name'),
            ];

            foreach ($envData as $key => $value) {
                $str = preg_replace("/^{$key}=.*/m", "{$key}='{$value}'", $str);
            }
            file_put_contents($envFile, $str); 
            return response()->json([
                'redirect' => route('setup'),
                'message' => 'Setup completed.'
            ]);
        }
        catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to migrate database: ' . $e->getMessage(),
            ], 500);
        }
        // Redirect to a success page or do further setup tasks
       
    }
    
    public function runMigrate(Request $request){
        $validator = Validator::make($request->all(), [  
            
            'db_host' => 'required',
            'db_port' => 'required',
            'db_database' => 'required',
            'db_username' => 'required',  
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()->first(),
            ], 422); // Return validation errors with HTTP status 422 (Unprocessable Entity)
        }
    
        
    }
    public function CheckDB(Request $request)
    {
        $validator = Validator::make($request->all(), [ 
            'db_host' => 'required',
            'db_port' => 'required',
            'db_database' => 'required',
            'db_username' => 'required',  
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()->first(),
            ], 422); // Return validation errors with HTTP status 422 (Unprocessable Entity)
        }

        try {
            // Set the database connection configuration dynamically
            config([
                'database.connections.dynamic' => [
                    'driver' => 'mysql',
                    'host' => $request->input('db_host'),
                    'port' => $request->input('db_port'),
                    'database' => $request->input('db_database'),
                    'username' => $request->input('db_username'),
                    'password' => $request->input('db_password'), // Assuming you have db_password in your form
                    'charset' => 'utf8mb4',
                    'collation' => 'utf8mb4_unicode_ci',
                    'prefix' => '',
                    'strict' => true,
                    'engine' => null,
                ]
            ]);
    
            // Attempt to establish the PDO connection
            $pdo = DB::connection('dynamic')->getPdo();
 
            
            return response()->json([
                'Passed' => true,
            ]);
        } catch (\PDOException $e) {
                return response()->json([
                    'Passed' => false,
                    'Msg' =>  $e->getMessage(),
                ]); 
        }
    } 
    public function SetupDB(Request $request)
    {
        $validator = Validator::make($request->all(), [ 
            'db_host' => 'required',
            'db_port' => 'required',
            'db_database' => 'required',
            'db_username' => 'required',  
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()->first(),
            ], 422); // Return validation errors with HTTP status 422 (Unprocessable Entity)
        }
        $envFile = app()->environmentFilePath();
        $str = file_get_contents($envFile);

        $envData = [
            'DB_HOST' => $request->input('db_host'),
            'DB_PORT' => $request->input('db_port'),
            'DB_DATABASE' => $request->input('db_database'),
            'DB_USERNAME' => $request->input('db_username'),
            'DB_PASSWORD' => $request->input('db_password'), 
        ];

        foreach ($envData as $key => $value) {
            $str = preg_replace("/^{$key}=.*/m", "{$key}='{$value}'", $str);
        }
        try {
            config([
                'database.connections.custom' => [
                    'driver' => 'mysql',
                    'host' => $request->input('db_host'),
                    'database' => $request->input('db_database'),
                    'username' => $request->input('db_username'),
                    'password' => $request->input('db_password'),
                    'charset' => 'utf8mb4',
                    'collation' => 'utf8mb4_unicode_ci',
                    'prefix' => '',
                    'strict' => true,
                    'engine' => null,
                ],
            ]);
            Artisan::call('config:clear');
    
            Artisan::call('migrate', [
                '--database' => 'custom',
                '--force' => true, // Use force flag to run in production
            ]);
            file_put_contents($envFile, $str); 
            return response()->json([ 
                'message' => 'Migration completed successfully.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to migrate database: ' . $e->getMessage(),
            ], 500); // HTTP status 500 for Internal Server Error
        } 
    }
}
