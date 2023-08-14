<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Course;
use App\Models\ParentRelation;
use App\Models\Schedule;
use App\Models\TeacherMeetSchedule;
use App\Models\UserType;
use Illuminate\Support\Facades\Auth;

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
        
        $courses = Course::whereIn('student_id', $studentIds)->get();
        return response()->json($courses);
    }
    
    public function getChildTeachers()
    {
        $parentId = Auth::user()->id;
        
        $studentIds = ParentRelation::where('parent_id', $parentId)->pluck('student_id');
        
        $teachers = User::whereIn('id', function ($query) use ($studentIds) {
            $query->select('teacher_id')
                ->from('courses')
                ->whereIn('student_id', $studentIds);
        })->where('user_type', 2)
        ->get();
        
        return response()->json($teachers);
    }
    
    public function getChildAttendance()
    {
        $parentId = Auth::user()->id;
        
        $studentIds = ParentRelation::where('parent_id', $parentId)->pluck('student_id');
        
        $attendance = Attendance::whereIn('student_id', $studentIds)->get();
        return response()->json($attendance);
    }
    
    public function getChildCourseSchedules()
    {
        $parentId = Auth::user()->id;
        
        $studentIds = ParentRelation::where('parent_id', $parentId)->pluck('student_id');
        
        $schedules = Schedule::whereIn('course_id', function ($query) use ($studentIds) {
            $query->select('id')
                ->from('courses')
                ->whereIn('student_id', $studentIds);
        })->get();
        
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
}

