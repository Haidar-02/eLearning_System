<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\CourseEnrollment;
use App\Models\CourseMaterial;
use App\Models\GroupProject;
use App\Models\Message;
use App\Models\Schedule;
use App\Models\TaskSubmission;
use App\Models\TeacherMeetSchedule;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class StudentController extends Controller
{


    public function enrollCourse(Request $request)
    {

        $user = Auth::user();

        $exists = CourseEnrollment::where('course_id', $request->course_id)->where('student_id', $user->id)->first();
        if ($exists) {
            return response()->json([
                "error" => "already enrolled"
            ]);
        }
        try {
            $course = new CourseEnrollment;
            $course->student_id = Auth::id();
            $course->course_id = $request->course_id;
            $course->save();
            return response()->json([
                'status' => 'success',
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }

    public function getEnrolledCourses()
    {
        try {
            $user = Auth::user();
            $courses = $user->courses()->with('teacher')->get();
            //
            return response()->json([
                'status' => '200',
                'courses' => $courses
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }





    // public function getCourseGrades($course_id){
    //     try{
    //         $course=Course::where([['id','=',$course_id]])->first();
    //         // $schedules=$course->schedules->with('tasks')->where()->get();

    //         return response()->json([
    //             'status' => '200',
    //             // 'projects'=>$members
    //         ]);
    //     } catch(Exception $e){
    //         return response()->json([
    //             'status' => 'error',
    //             'message' => $e->getMessage()
    //         ]);
    //     } 
    // }

    public function addTaskSubmission(Request $request)
    {

        try {
            $submission = new TaskSubmission;
            $submission->task_id = $request->task_id;
            $submission->student_id = Auth::id();
            $base64Image = $request->input('file');
            $binaryData = base64_decode($base64Image);
            $originalFileName = $request->file_name;

            //create temp file
            $tempFilePath = tempnam(sys_get_temp_dir(), 'temp_base64');
            file_put_contents($tempFilePath, $binaryData);

            $uploadedFile = new \Illuminate\Http\UploadedFile(
                $tempFilePath,
                $originalFileName,
                // Provide a fallback original filename
                mime_content_type($tempFilePath),
                // Guess the MIME type
                null,
                true // Delete the file after it's used
            );

            //get file extension
            $fileExtension = $uploadedFile->getClientOriginalExtension();
            unlink($tempFilePath);
            $fileName = uniqid() . '.' . $fileExtension;

            Storage::disk('public')->put('files/' . $fileName, $binaryData);
            $publicUrl = Storage::disk('public')->url('files/' . $fileName);
            $submission->file_path = $publicUrl;
            $submission->save();
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


    public function addTeacherMeet(Request $request)
    {
        //location and meet_link should be set by teacher
        try {
            $teacher_meet = new TeacherMeetSchedule;
            $teacher_meet->teacher_id = $request->teacher_id;
            $teacher_meet->user_id = Auth::id();
            $teacher_meet->start_time = $request->start_time;
            $teacher_meet->end_time = $request->end_time;
            $teacher_meet->save();
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

    public function getTeacherMeet($teacher_id){
        try{
        $teacher_meet=TeacherMeetSchedule::where([['teacher_id','=',$teacher_id],['user_id','=',Auth::id()]])->first();
        return response()->json([
            'status' => '200',
            'teacher_meet'=> $teacher_meet
        ]);
        } catch(Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }

}