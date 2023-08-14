<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ParentController extends Controller
{
    public function getChildCourses()
    {
        // Logic to fetch the list of courses enrolled by the child
    }
    public function getChildTeachers()
    {
        // Logic to fetch a list of teachers for the child's courses
    }
    public function getChildAttendance()
    {
        // Logic to fetch attendance records for the child
    }
    public function getChildCourseSchedules()
    {
        // Logic to fetch course schedules for the child
    }
    public function getTeacherConferenceSlots($teacherId)
    {
        // Logic to fetch available time slots for parent-teacher conferences
    }
    
    public function scheduleConferenceWithTeacher($teacherId, Request $request)
    {
        // Logic to schedule a parent-teacher conference
    }
}
