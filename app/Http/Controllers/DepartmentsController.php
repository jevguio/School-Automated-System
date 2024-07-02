<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Departments;

class DepartmentsController extends Controller
{
    public function index(Request $request)
    {
        // Retrieve all departments from the database
        if (!$request->ajax()) {
            return response()->json([
                'error' => 'forbidden'
            ], 403);
        }

        $departments = Departments::all();

        // Return the departments as a JSON response
        return response()->json($departments);
    } 
}
