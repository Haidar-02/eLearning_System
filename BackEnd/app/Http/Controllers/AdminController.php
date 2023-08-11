<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    function addUser(Request $request){

    }
    function modifyUser(Request $request){

    }

    function deleteUser($user_id){

    }

    function addCourse(Request $request){

    }

    function modifyCourse(Request $request){

    }

    function deleteCourse($course_id){
        
    }

    function courseLimit(Request $request){

    }

    //student grades per course
    function studentProgress($student_id){

    }

    //how many students succeeded in each course
    function courseCompletion($course_id){

    }

    function teacherPerformance($teacher_id){

    }

    function addTheme(){

    }
    function addEmailTemplate(){

    }

    function getSupportMessage(){

    }
    function databaseBackup(){
        // Artisan::call('backup:run');
    }

}
