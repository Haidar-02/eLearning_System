<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Course_Enrollment;
use App\Models\Course_Material;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StudentController extends Controller
{
    function getAllCourses(){
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

    function enrollCourse(Request $request){
        try{
            $course=new Course_Enrollment;
            $course->student_id=Auth::id();
            $course->course_id=$request->course_id;
            $course.save();
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

    
    function enrolledCourses(){
        try{
            $user=Auth::user();
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
    
    function getCourseSchedules(Request $request){
        try{
            $course_id=$request->course_id;
            $schedules=DB::table('courses')->whereColumn([['course_id','=',$course_id]])->schedules();
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
    function getCourseMaterials(Request $request){
        try{
            $course_id=$request->course_id;
            $schedule_id=$request->schedule_id;
            $materials=DB::table('schedules')->whereColumn([['course_id','=',$course_id],['schedule_id','=',$schedule_id]])->materials();
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
