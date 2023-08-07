<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Schedule;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TeacherController extends Controller
{

    public function getTeacherCourses(){
        try{
            $user=Auth::id();
            $courses=Course::where('teacher_id',$user)->get();
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

    public function addCourseSchedule(Request $request){

    }

    
    public function removeCourseSchedule(Request $request){
        
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

    public function addScheduleMaterial(Request $request){

    }

    
    public function removeScheduleMaterial(Request $request){
        
    }

    
    public function getScheduleTasks($course_id,$schedule_id){
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
    public function addScheduleTask($course_id,$schedule_id){
    }

    public function removeScheduleTask($course_id,$schedule_id){

    }

    public function getScheduleSessions($course_id,$schedule_id){
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
    public function addScheduleSessions($course_id,$schedule_id){
    }

    public function removeScheduleSessions($course_id,$schedule_id){

    }

    public function addAttendance($course_id,$schedule_id){

    }

    public function projectGroups($course_id,$schedule_id){

    }

    public function projectGroupMembers($course_id,$schedule_id){

    }
}
