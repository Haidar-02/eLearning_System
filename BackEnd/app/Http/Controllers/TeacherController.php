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

    public function getCourseStudents(){

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
    public function addScheduleSession($course_id,$schedule_id){
    }

    public function removeScheduleSession($course_id,$schedule_id){

    }




    public function getSessionAttendance($session_id){

    }
    public function addSessionAttendance(Request $request){

    }


    public function getCourseProjects($course_id){

    }

    
    public function addCourseProject(Request $request){

    }
    public function addProjectMembers(Request $request){

    }

    public function addTaskGrade(Request $request){

    }

    public function addProjectGrade(Request $request){
        
    }

    public function addFeedback(Request $request){

    }

    public function getMessage(){

    }

    public function sendMessage(Request $request){

    }

    public function createNotification(Request $request){

    }

    public function getCourseDiscussion($course_id){

    }
    public function addDiscussionMessage(Request $request){

    }

    
}
