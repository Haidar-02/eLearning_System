<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\CourseEnrollment;
use App\Models\CourseMaterial;
use App\Models\Schedule;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class StudentController extends Controller
{
    public function getAllCourses(){
        try{
            $courses=Course::all();
            return response()->json([
                'status' => 'success',
                'courses' => $courses,
            ]);
        } catch(Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }

    public function enrollCourse(Request $request){
        try{
            $course=new CourseEnrollment;
            $course->student_id=Auth::id();
            $course->course_id=$request->course_id;
            $course->save();
            return response()->json([
                'status' => 'success',
            ]);
        } catch(Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }

    
    }

    
    public function enrolledCourses(){
        try{
            $user_id=Auth::id();
            $user=User::find($user_id);
            $courses=$user->courses;
            return response()->json([
                'status' => 'success',
                'courses' => $courses
            ]);
        } catch(Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }
    
    public function getCourseSchedules($course_id){
        try{
            $course=Course::find($course_id);
            $schedules=$course->schedules;
            return response()->json([
                'status' => 'success',
                'schedules'=>$schedules
            ]);
        } catch(Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }    
    }
    public function getScheduleMaterials($course_id,$schedule_id){
        try{

            $schedule=Schedule::where([['course_id','=',$course_id],['id','=',$schedule_id]])->first();
            $materials=$schedule->materials;

            return response()->json([
                'status' => 'success',
                'materials'=>$materials
            ]);
        } catch(Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }    
    }


}
