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
    

    function addCourse(Request $request){

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
