<?php

namespace App\Http\Controllers;

use App\Models\BoardMessage;
use App\Models\Course;
use App\Models\Feedback;
use App\Models\GroupProject;
use App\Models\Message;
use App\Models\Notification;
use App\Models\Schedule;
use App\Models\Task;
use App\Models\TaskSubmission;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommonController extends Controller
{

    public function getAllCourses()
    {
        try {
            $courses = Course::with('teacher')->withCount("enrollments")->get();
            return response()->json([
                'status' => '200',
                'courses' => $courses,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }

    public function getCourseStudents($course_id)
    {
        try {
            $course = Course::find($course_id);
            $students = $course->students;
            return response()->json([
                'status' => '200',
                'students'=>$students
            ]);
        } catch (Exception $e) {
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
                'status' => '200',
                'schedules'=>$schedules
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }
    public function getScheduleMaterials($schedule_id)
    {
        try {

            $schedule = Schedule::where([['id', '=', $schedule_id]])->first();
            $materials = $schedule->materials;

            return response()->json([
                'status' => '200',
                'materials'=>$materials
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }
    public function getScheduleTasks($schedule_id)
    {
        try {
            $schedule = Schedule::where([['id', '=', $schedule_id]])->first();
            $tasks = $schedule->tasks;

        return response()->json([
            'status' => '200',
            'tasks'=>$tasks
        ]);
    } catch(Exception $e){
        return response()->json([
            'status' => 'error',
            'message' => $e->getMessage()
        ]);
    } 
    }

    public function getTaskSubmissions($task_id)
    {
        try {
            $submissions = TaskSubmission::where([['task_id', '=', $task_id]])->get();
            return response()->json([
                'status' => '200',
                'submissions'=>$submissions
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }
    public function getScheduleSessions($schedule_id)
    {
        try {
            $schedule = Schedule::where([['id', '=', $schedule_id]])->first();
            $sessions = $schedule->sessions;

            return response()->json([
                'status' => '200',
                'sessions'=>$sessions
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }

    public function getProjectGroups($course_id){
        try{
            $course=Course::where([['id','=',$course_id]])->first();
            $groups=$course->groups()->with('membersInfo')->get();
    
            return response()->json([
                'status' => '200',
                'groups'=>$groups
            ]);
        } catch (Exception $e) {
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
                'status' => '200',
                'projects'=>$members
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }

    public function getStudentProgress($student_id, $course_id = null)
    {
        try {   
            if ($course_id !== null) {
                $taskIds = Task::where('course_id', $course_id)->pluck('id');
        
                $submitted_tasks = TaskSubmission::whereIn('task_id', $taskIds)
                    ->where('student_id', $student_id)
                    ->count();
        
                $succeeded_tasks = TaskSubmission::whereIn('task_id', $taskIds)
                    ->where('student_id', $student_id)
                    ->where('grade', '>', 60)
                    ->count();
        
                $ungraded_tasks = TaskSubmission::whereIn('task_id', $taskIds)
                    ->where('student_id', $student_id)
                    ->whereNull('grade')
                    ->count();
                return response()->json([
                    'status' => '200',
                    'submitted_tasks' => $submitted_tasks,
                    'succeeded_tasks' => $succeeded_tasks,
                    'ungraded_tasks' => $ungraded_tasks
                ]);
            }
        
        } catch (\Throwable $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }
    
    public function getStudentFeedback($course_id, $student_id)
    {
        try {
            $feedback = Feedback::where([['course_id', '=', $course_id], ['student_id', '=', $student_id]])->first();
            return response()->json([
                'status' => '200',
                'feedback'=>$feedback
            ]);
        } catch (Exception $e) {
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
        $message=$message->with(['isSender', 'isReceiver'])->get();
        return response()->json([
            'status' => '200',
            'message' => $message
        ]);
        } catch(Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }

    }
    public function getMessages()
    {
        try {

            $user_id = Auth::id();
            $messages = Message::
                where('sender_id', $user_id)
                ->orWhere('receiver_id', $user_id)
                ->with(['isSender', 'isReceiver'])
                ->get();

            return response()->json([
                'status' => 'success',
                'user' => Auth::user(),
                'messages' => $messages,

            ]);

        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }

    }


    public function getMessagesById(Request $request, $id)
    {
        try {
            $user = Auth::user();
            $userId = $user->id;

            $messages = Message::
                where('sender_id', $userId)
                ->where('receiver_id', $id)
                ->orWhere('sender_id', $id)
                ->where('receiver_id', $userId)

                ->with(['isSender', 'isReceiver'])
                ->orderBy('created_at')
                ->get();

            return response()->json([
                'status' => 'success',
                'messages' => $messages,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()

            ]);
        }
    }

    public function getCourseDiscussion($course_id)
    {
        try {
            $board_messages = BoardMessage::with('user')->get();
            return response()->json([
                'status' => '200',
                'message'=>$board_messages
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }


    public function getCourseNotifications($course_id)
    {
        try {
            $notifications = Notification::where("course_id", $course_id)->get();
            return response()->json([
                'status' => '200',
                'notifications'=>$notifications
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }
    public function addCourseDiscussion(Request $request)
    {
        try {
            $board_messages = new BoardMessage;
            $board_messages->user_id = Auth::id();
            $board_messages->course_id = $request->course_id;
            $board_messages->message = $request->message;
            $board_messages->save();
            return response()->json([
                'status' => '200',
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }

    public function getCourseTeacher($course_id)
    {
        try {
            $course = Course::where([['id', '=', $course_id]])->first();
            $teacher = $course->teacher;
            return response()->json([
                'status' => 'success',
                'teacher'=> $teacher
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }

    function searchUser(Request $request, $user_type, $search)
    {
        $user = Auth::user();
        $userId = $user->id;

        if (!$search) {
            return;
        }

        if ($search === "al") {
            $all = User::where('id', '!=', $userId)->where('user_type', '=', $user_type)->get();
            return response()->json([
                "users" => $all,
            ]);
        }
        $res = User::where('name', 'LIKE', "%{$search}%")
            ->where('id', '!=', $userId)
            ->where('user_type', '=', $user_type)
            ->get();

        return response()->json([
            "users" => $res,
        ]);
    }






}