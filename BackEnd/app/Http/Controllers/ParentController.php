<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\Conference;
use App\Models\User;
use App\Models\Course;
use App\Models\CourseEnrollment;
use App\Models\Feedback;
use App\Models\ParentRelation;
use App\Models\Task;
use App\Models\TaskSubmission;
use Error;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ParentController extends Controller
{
    public function getChildren()
    {
        try {
            $parentId = Auth::user()->id;
            
            $children = User::join('parent_relations', 'users.id', '=', 'parent_relations.student_id')
                ->where('parent_relations.parent_id', $parentId)
                ->where('users.user_type', 4)
                ->select('users.*')
                ->get();
            
            return response()->json(['status' => 200, 'children' => $children]);
        } catch (Error $error) {
            return response()->json(['status' => 'error', 'message' => $error], 500);
        }
    }

    public function getChildCourses($studentId)
    {
        try {
            $courses = Course::whereIn('id', function ($query) use ($studentId) {
                $query->select('course_id')
                    ->from('course_enrollments')
                    ->where('student_id', $studentId);
            })->get();
    
            return response()->json(['status' => 200, 'courses' => $courses]);
        } catch (Error $error) {
            return response()->json(['status' => 'error', 'message' => $error], 500);
        }
    }

    
    public function getChildTeachers($studentId)
    {
        try {
            $enrolledCourses = CourseEnrollment::where('student_id', $studentId)->pluck('course_id');
            $teacherIds = Course::whereIn('id', $enrolledCourses)->pluck('teacher_id');
        
            $teachers = User::whereIn('id', $teacherIds)
                ->where('user_type', 2)
                ->get();
        
            return response()->json(['status' => 200, 'teachers' => $teachers]);
        } catch (Error $error) {
            return response()->json(['status' => 'error', 'message' => $error], 500);
        }
    }
    

    public function getChildAttendance()
    {
        try {
            $parentId = Auth::user()->id;
        
            $studentIds = ParentRelation::where('parent_id', $parentId)->pluck('student_id');
        
            $attendance = Attendance::whereIn('student_id', $studentIds)
                ->join('sessions', 'attendances.session_id', '=', 'sessions.id')
                ->join('schedules', 'sessions.schedule_id', '=', 'schedules.id')
                ->join('courses', 'schedules.course_id', '=', 'courses.id')
                ->select('attendances.*', 'sessions.*', 'schedules.*', 'courses.*')
                ->orderBy('sessions.date', 'desc')
                ->get();
        
            return response()->json(['status' => 200, 'data' => $attendance]);
        } catch (Error $error) {
            return response()->json(['status' => 'error', 'message' => $error], 500);
        }
    }
    
    
    public function getAvailableTeacherConferences($teacherId)
    {
        $availableSlots = Conference::where('teacher_id', $teacherId)
            ->whereNull('parent_id')
            ->get();
    
        return response()->json(['status' => 200, 'available_slots' => $availableSlots]);
    }

    public function getParentConferences()
    {
        $parentId = Auth::user()->id;

        $parentSlots = Conference::where('parent_id', $parentId)
            ->get();
    
        return response()->json(['status' => 200, 'parent_slots' => $parentSlots]);
    }
    

    public function scheduleConferenceWithTeacher($conference_id)
    {
        $conference = Conference::find($conference_id);

        if (!$conference) {
            return response()->json(['error' => 'Conference not found'], 404);
        }

        $conference->parent_id = Auth::user()->id;
        $conference->save();

        return response()->json(['message' => 'Conference scheduled successfully'], 200);
    }

    public function getStudentFeedback($studentId)
    {
        try {
            $feedbacks = Feedback::where('student_id', $studentId)
                ->with(['teacher', 'course'])
                ->get();
    
            return response()->json(['status' => 200, 'feedbacks' => $feedbacks]);
        } catch (Error $error) {
            return response()->json(['status' => 'error', 'message' => $error], 500);
        }
    }
    
    public function getChildTasks($studentId)
    {
        try {
            $tasks = Task::select(
                'tasks.*',
                'task_types.name as task_type_name',
                'users.name as teacher_name',
                'users.email as teacher_email',
                DB::raw('(SELECT COUNT(*) FROM task_submissions WHERE task_submissions.task_id = tasks.id AND task_submissions.student_id = ' . $studentId . ') > 0 as is_done')
            )
            ->join('schedules', 'tasks.schedule_id', '=', 'schedules.id')
            ->join('courses', 'schedules.course_id', '=', 'courses.id')
            ->join('course_enrollments', 'courses.id', '=', 'course_enrollments.course_id')
            ->join('task_types', 'tasks.task_type', '=', 'task_types.id')
            ->join('users', 'tasks.teacher_id', '=', 'users.id')
            ->where('course_enrollments.student_id', $studentId)
            ->get();
    
            return response()->json(['status' => 200, 'tasks' => $tasks]);
        } catch (Error $error) {
            return response()->json(['status' => 'error', 'message' => $error], 500);
        }
    }
    
    public function getChildGrades($studentId)
    {
        try {
            $grades = TaskSubmission::select(
                'task_submissions.*',
                'tasks.title as task_title',
                'tasks.max_score as max_score',
                'tasks.due_date as task_due_date'
            )
            ->join('tasks', 'task_submissions.task_id', '=', 'tasks.id')
            ->join('schedules', 'tasks.schedule_id', '=', 'schedules.id')
            ->join('courses', 'schedules.course_id', '=', 'courses.id')
            ->join('course_enrollments', 'courses.id', '=', 'course_enrollments.course_id')
            ->where('task_submissions.student_id', $studentId)
            ->get();
    
            return response()->json(['status' => 200, 'grades' => $grades]);
        } catch (Error $error) {
            return response()->json(['status' => 'error', 'message' => $error], 500);
        }
    }
    


}

