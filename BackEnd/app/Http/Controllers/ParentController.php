<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Course;
use App\Models\CourseEnrollment;
use App\Models\Feedback;
use App\Models\ParentRelation;
use App\Models\Schedule;
use App\Models\Task;
use App\Models\TaskSubmission;
use App\Models\TeacherMeetSchedule;
use App\Models\UserType;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ParentController extends Controller
{
    public function getChild()
    {
        $parentId = Auth::user()->id;
        
        $child = User::join('parent_relations', 'users.id', '=', 'parent_relations.student_id')
            ->where('parent_relations.parent_id', $parentId)
            ->where('users.user_type', 4)
            ->select('users.*')
            ->first();
        
        if (!$child) {
            return response()->json(['error' => 'Invalid child ID'], 404);
        }
        
        return response()->json($child);
    }

    public function getChildCourses()
    {
        $parentId = Auth::user()->id;

        $studentIds = ParentRelation::where('parent_id', $parentId)->pluck('student_id');

        $courses = Course::whereIn('id', function ($query) use ($studentIds) {
            $query->select('course_id')
                ->from('course_enrollments')
                ->whereIn('student_id', $studentIds);
        })->get();

        return response()->json($courses);
    }

    
    public function getChildTeachers()
    {
        $parentId = Auth::user()->id;   
        $studentIds = ParentRelation::where('parent_id', $parentId)->pluck('student_id');
        $enrolledCourses = CourseEnrollment::whereIn('student_id', $studentIds)->pluck('course_id');
        $teacherIds = Course::whereIn('id', $enrolledCourses)->pluck('teacher_id');
    
        $teachers = User::whereIn('id', $teacherIds)
            ->where('user_type', 2)
            ->get();
    
        return response()->json($teachers);
    }

    public function getChildAttendance()
    {
        $parentId = Auth::user()->id;
    
        $studentIds = ParentRelation::where('parent_id', $parentId)->pluck('student_id');
    
        $attendance = Attendance::whereIn('student_id', $studentIds)
            ->join('sessions', 'attendances.session_id', '=', 'sessions.id')
            ->join('schedules', 'sessions.schedule_id', '=', 'schedules.id')
            ->join('courses', 'schedules.course_id', '=', 'courses.id')
            ->select('attendances.*', 'sessions.*', 'schedules.*', 'courses.*')
            ->orderBy('sessions.date', 'desc')
            ->get();
    
        return response()->json($attendance);
    }
    
    public function getChildCourseSchedules($courseId)
    {
        $parentId = Auth::user()->id;
    
        $schedules = Schedule::select('schedules.*')
            ->join('courses', 'schedules.course_id', '=', 'courses.id')
            ->join('course_enrollments', 'courses.id', '=', 'course_enrollments.course_id')
            ->join('parent_relations', 'course_enrollments.student_id', '=', 'parent_relations.student_id')
            ->where('parent_relations.parent_id', $parentId)
            ->where('courses.id', $courseId)
            ->get();
    
        return response()->json($schedules);
    }
    
    public function getTeacherConferenceSlots($teacherId)
    {
        $slots = TeacherMeetSchedule::where('teacher_id', $teacherId)->get();
        return response()->json($slots);
    }

    public function scheduleConferenceWithTeacher($teacherId, Request $request)
    {
        $data = $request->validate([
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
        ]);

        $conference = new TeacherMeetSchedule();
        $conference->teacher_id = $teacherId;
        $conference->start_time = $data['start_time'];
        $conference->end_time = $data['end_time'];
        $conference->save();

        return response()->json(['message' => 'Conference scheduled successfully'], 201);
    }

    public function getStudentFeedback()
    {
        $parentId = Auth::user()->id;
    
        $childId = ParentRelation::where('parent_id', $parentId)->value('student_id');
    
        $feedbacks = Feedback::where('student_id', $childId)
            ->with(['teacher', 'course'])
            ->get();
    
        return response()->json($feedbacks);
    }

    public function getChildTasks()
    {
        $parentId = Auth::user()->id;
        $childId = ParentRelation::where('parent_id', $parentId)->value('student_id');

        $tasks = Task::select(
            'tasks.*',
            'task_types.name as task_type_name',
            'users.name as teacher_name',
            'users.email as teacher_email',
            DB::raw('(SELECT COUNT(*) FROM task_submissions WHERE task_submissions.task_id = tasks.id AND task_submissions.student_id = ' . $childId . ') > 0 as is_done')
        )
        ->join('schedules', 'tasks.schedule_id', '=', 'schedules.id')
        ->join('courses', 'schedules.course_id', '=', 'courses.id')
        ->join('course_enrollments', 'courses.id', '=', 'course_enrollments.course_id')
        ->join('parent_relations', 'course_enrollments.student_id', '=', 'parent_relations.student_id')
        ->join('task_types', 'tasks.task_type', '=', 'task_types.id')
        ->join('users', 'tasks.teacher_id', '=', 'users.id')
        ->where('parent_relations.parent_id', $parentId)
        ->get();
    
        return response()->json($tasks);
    }
    

    public function getChildUndoneTasks()
    {
        $parentId = Auth::user()->id;
        $childId = ParentRelation::where('parent_id', $parentId)->value('student_id');
        
        $undoneTasks = Task::select('tasks.*', 'task_types.name as task_type_name', 'users.name as teacher_name', 'users.email as teacher_email')
            ->join('schedules', 'tasks.schedule_id', '=', 'schedules.id')
            ->join('courses', 'schedules.course_id', '=', 'courses.id')
            ->join('course_enrollments', 'courses.id', '=', 'course_enrollments.course_id')
            ->join('parent_relations', 'course_enrollments.student_id', '=', 'parent_relations.student_id')
            ->join('task_types', 'tasks.task_type', '=', 'task_types.id')
            ->join('users', 'tasks.teacher_id', '=', 'users.id')
            ->where('parent_relations.parent_id', $parentId)
            ->whereNotExists(function ($query) use ($childId) {
                $query->select(DB::raw(1))
                    ->from('task_submissions')
                    ->whereRaw('task_submissions.task_id = tasks.id')
                    ->where('task_submissions.student_id', $childId);
            })
            ->get();
    
        return response()->json($undoneTasks);
    }

}

