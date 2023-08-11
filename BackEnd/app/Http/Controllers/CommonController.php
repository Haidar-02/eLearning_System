<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\GroupProject;
use App\Models\Message;
use App\Models\Schedule;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommonController extends Controller
{
    
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
    public function getScheduleMaterials($schedule_id){
        try{

            $schedule=Schedule::where([['id','=',$schedule_id]])->first();
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
    public function getScheduleTasks($schedule_id){
    try{
        $schedule=Schedule::where([['id','=',$schedule_id]])->first();
        $tasks=$schedule->tasks;

        return response()->json([
            'status' => 'success',
            'tasks'=>$tasks
        ]);
    } catch(Exception $e){
        return response()->json([
            'status' => 'error',
            'message' => $e->getMessage()
        ]);
    } 
    }

    public function getScheduleSessions($schedule_id){
        try{
            $schedule=Schedule::where([['id','=',$schedule_id]])->first();
            $sessions=$schedule->sessions;
    
            return response()->json([
                'status' => 'success',
                'sessions'=>$sessions
            ]);
        } catch(Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        } 
    }

    public function getScheduleProjects($schedule_id){
        try{
            $schedule=Schedule::where([['id','=',$schedule_id]])->first();
            $projects=$schedule->projects;
    
            return response()->json([
                'status' => 'success',
                'projects'=>$projects
            ]);
        } catch(Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        } 
    }

    public function getProjectMembers($project_id){
        try{
            $project=GroupProject::where([['id','=',$project_id]])->first();
            $members=$project->members()->with('info')->get();
            return response()->json([
                'status' => 'success',
                'projects'=>$members
            ]);
        } catch(Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        } 
    }
    public function sendMessage(Request $request){
        try{
        $message=new Message;
        $message->sender_id=Auth::id();
        $message->receiver_id=$request->receiver_id;
        $message->message=$request->message;
        $message->save();
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
    public function getMessages(){
        try{
        $messages=Message::where('sender_id',Auth::id())->orWhere('receiver_id',Auth::id())->get();
        return response()->json([
            'status' => 'success',
            'message'=>$messages
        ]);
        } catch(Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        } 

    }
    public function getCourseDiscussion($course_id){

    }
}
