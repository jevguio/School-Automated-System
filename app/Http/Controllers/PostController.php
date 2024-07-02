<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request; 
use App\Models\Post;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
class PostController extends Controller
{
    public function store(Request $request)
    {
        // Validate the request data
        
        if (!$request->ajax()) {
            return response()->json([
                'error' => 'forbidden'
            ]);
        }
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'departments_value' => 'required|string', // Ensure departments_value is an array
         ]);
        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()->first(),
            ]); // Return validation errors with HTTP status 422 (Unprocessable Entity)
        }   
        try{

            $post = new Post();
            $post->departments = ' '; 
            $post->teacher_id = Auth::user()->id; 
            $post->title = $request->input('title'); 
            $post->description = $request->input('description');  
            $post->departments_value =json_encode($request->input('departments_value'));
            // if($request->file('fileImage',[])){
                
            //     return response()->json(['fileImage1' => $request->file('fileImage',[])]);
            // } 
            // if($request->file('fileImage.*',[])){
                
            //     return response()->json(['fileImage2' => $request->file('fileImage.*',[])]);
            // }
            // if($request->file('fileImage')){
                
            //     return response()->json(['fileImage3' => $request->file('fileImage')]);
            // }
            // if($request->file('fileImage.*')){
                
            //     return response()->json(['fileImage4' => $request->file('fileImage.*')]);
            // }


            if ($request->hasFile('fileImage.*',[])) {
                $filePaths = [];
                foreach ($request->file('fileImage',[]) as $file) {
                    $filePaths[] = $file->store('uploads', 'public');
                }
                if(count($filePaths)!==0){

                    $post->fileImage = json_encode($filePaths);  
                }else{
                    
                    return response()->json(['error' => "fileImage found but filePaths not found"]);
                }
            } else { 
                $post->fileImage = json_encode([]); 
            }
            $post->save();
        } catch(\Exception $ex){
            return response()->json(['error' => "create error:".$ex->getMessage()]);
        }

        // Return a response
        return response()->json(['message' => 'Data submitted successfully','success'=>true], 201);
    }
    
    public function get(Request $request){
        if (!$request->ajax()) {
            return response()->json([
                'error' => 'forbidden'
            ]);
        }
        try{

           
            $posts = Post::orderBy('created_at', 'desc')->get();
            return response()->json(['data'=>$posts]);
        }catch(\Exception $ex){
            
            return response()->json(['error'=>$ex]);
        }
    }
}
