<?php

use App\Http\Controllers\CommonController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\UnauthorizedController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\AdminController;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/




Route::group(["middleware" => "auth:api"], function () {
    Route::group(["prefix" => "user"], function () {
        Route::post("logout", [AuthController::class, "logout"]);
        Route::post("refresh", [AuthController::class, "refresh"]);
    });
    // Route::group(["prefix" => "teacher", "middleware" => "teacher.valid"], function () {

    // });

    Route::group(["prefix" => "common", "middleware" => "student.valid"], function () {
        Route::controller(CommonController::class)->group(function () {
            Route::get("get-courses", "getAllCourses");
            Route::get("get-course-schedules/{course_id}", "getCourseSchedules");
            Route::get("get-schedule-materials/{course_id}/{schedule_id}", "getScheduleMaterials");
            Route::get("get-schedule-tasks", "getScheduleTasks");
            Route::get("get-schedule-sessions", "getScheduleSessions");
            Route::get("get-schedule-projects", "getScheduleProjects");
            Route::get("get-project-members", "getProjectMembers");
            Route::get("get-schedule-tasks", "getScheduleTasks");
            Route::post("send-message", "sendMessage");
            Route::get("get-messages", "getMessages");
            Route::get("get-course-discussion", "getCourseDiscussion");
            Route::post("add-course-discussion", "addCourseDiscussion");

            // Route::get("unauthorized", [UnauthorizedController::class, "unauthorized"]);
        });
    });

    Route::group(["prefix" => "student", "middleware" => "student.valid"], function () {
        Route::controller(StudentController::class)->group(function () {
            Route::post("enroll-course", "enrollCourse");
            Route::get("get-enrolled-courses", "getEnrolledCourses");
            Route::post("add-submission", 'addTaskSubmission');
            Route::get("get-course_teacher/{course_id}", 'getCourseTeacher');
            Route::post("add-teacher_meet", "addTeacherMeet");
            Route::get("get-teacher-meet/{teacher_id}", "getTeacherMeet");
            // Route::get("unauthorized", [UnauthorizedController::class, "unauthorized"]);
        });
    });

    Route::group(["prefix" => "admin", "middleware" => "admin.valid"], function () {

        Route::controller(AdminController::class)->group(function () {
            Route::post("modifyUser/{user_id}", "modifyUser");
            Route::delete('/deleteUser/{user}', "deleteUser");
            Route::post('/addCourse', "addCourse");
            Route::post('/modifyCourse/{course}', "modifyCourse");
            Route::delete('/deleteCourse/{course}', "deleteCourse");
            Route::get('/checkEnrollmentLimit/{course}', "checkEnrollmentLimit");
            Route::get('/createBackup', 'createBackup');


        });

        Route::controller(AuthController::class)->group(function () {
        });
    });

    Route::group(["prefix" => "parent", "middleware" => "parent.valid"], function () {
    });
});

Route::controller(AuthController::class)->group(function () {
    Route::post("register", "register");

    Route::post("login", "login");
});


// Route::get('send-email',function(){
//     $mailData = [
//         "name" => "test test",
//         "message" => "12392"
//     ];
//     Mail::to*("hello@example.com")->send(new TestEmail ($mailData));
//     dd("sent successfully")
// });
