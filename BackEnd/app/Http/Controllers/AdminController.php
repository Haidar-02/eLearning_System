<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\UserType;

class AdminController extends Controller
{

    function modifyUser(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:users',
            'password' => 'sometimes|string|min:6',
            'user_type' => 'sometimes|integer',
        ]);
    
        if ($request->name) {
            $user->name = $request->name;
        }
    
        if ($request->has('email')) {
            $user->email = $request->email;
        }
    
        if ($request->has('password')) {
            $user->password = Hash::make($request->password);
        }
    
        if ($request->has('user_type')) {
            $user->user_type = $request->user_type;
        }
    
        $user->save();
    
        return response()->json([
            'message' => 'User modified successfully',
            'user' => $user,
        ]);

    }

    function deleteUser(User $user){

        $user->delete();

        return response()->json([
            'message' => 'User deleted successfully',
        ]);
    }
    

   function addCourse(Request $request)
    {
    $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'required|string',
        'teacher_id' => 'required|exists:users,id',
        'enrollment_limit' => 'required|integer|min:1',
        'class_code' => 'required|string|unique:courses,class_code',
    ]);

    $course = new Course([
        'title' => $request->title,
        'description' => $request->description,
        'teacher_id' => $request->teacher_id,
        'enrollment_limit' => $request->enrollment_limit,
        'class_code' => $request->class_code,
    ]);

    $course->save();

    return response()->json([
        'message' => 'Course created successfully',
        'course' => $course,
    ]);
}

    function modifyCourse(Request $request){

    }

    function deleteCourse($course_id){
        
    }

    function courseLimit(Request $request){

    }

    //student grades per course
    function studentProgress($student_id){

    }

    //how many students succeeded in each course
    function courseCompletion($course_id){

    }

    function teacherPerformance($teacher_id){

    }

    function addTheme(){

    }
    function addEmailTemplate(){

    }

    function getSupportMessage(){

    }
    function databaseBackup(){
        // Artisan::call('backup:run');
    }

}
