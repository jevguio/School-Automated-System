<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request; 
use Illuminate\Support\Facades\Validator;
use App\Models\Course;

class CourseController extends Controller
{
    public function index(Request $request)
    {
        // Retrieve all departments from the database
        if (!$request->ajax()) {
            return response()->json([
                'error' => 'forbidden'
            ], 403);
        }

        $departments = Course::all();

        // Return the departments as a JSON response
        return response()->json($departments);
    } 
}
