<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\UserType;
use App\Models\Course;

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

    // try {
    // $request->validate([
    //     'title' => 'required|string|max:255',
    //     'description' => 'required|string',
    //     'teacher_id' => 'required|exists:users,id',
    //     'enrollment_limit' => 'required|integer|min:1',
    //     'class_code' => 'required|unique:courses,class_code',
    // ]);
 
    $course = new Course([
        'title' => $request->title,
        'description' => $request->description,
        'teacher_id' => $request->teacher_id,
        'enrollment_limit' => $request->enrollment_limit,
    ]);
// }catch (\Exception $e) {
//     error_log($e->getMessage());
//     return response()->json(['error' => 'An error occurred while creating the course'], 500);
// }
    $course->class_code = substr(Str::uuid(), 0, 8) ; 
    $course->save();

    return response()->json([
        'message' => 'Course created successfully',
        'course' => $course,
    ]);

    }



    function modifyCourse(Request $request, Course $course)
    {
        $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'teacher_id' => 'sometimes|exists:users,id',
            'enrollment_limit' => 'sometimes|integer|min:1',
            'meet_link' => 'sometimes|nullable|string',
        ]);
    
        $course->update($request->only([
            'title',
            'description',
            'teacher_id',
            'enrollment_limit',
            'meet_link',
        ]));
    
        return response()->json([
            'message' => 'Course updated successfully',
            'course' => $course,
        ]);

    }

    function deleteCourse(Course $course){
        $course->delete();
        return response()->json([
            'message' => 'Course deleted successfully',
        ]);
    }



    public function checkEnrollmentLimit(Course $course)
    {
        $enrolledStudentCount = $course->students()->where('user_type', 4)->count();
        $remainingSlots = $course->enrollment_limit - $enrolledStudentCount;
    
        return response()->json([
            'enrolled_student_count' => $enrolledStudentCount,
            'remaining_slots' => $remainingSlots,
        ]);
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



        public function createBackup()
    {
        Artisan::call('backup:run');

        return response()->json([
            'message' => 'Backup created successfully',
        ]);
    }
 

}
