<?php

use App\Http\Controllers\CommonController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\UnauthorizedController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\MailController;





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
    Route::group(["prefix" => "teacher", "middleware" => "teacher.valid"], function () {
        Route::controller(TeacherController::class)->group(function () {
            //date time  'YYYY-MM-DD hh:mm:ss' 
            Route::get("get-teacher-courses", "getTeacherCourses");
            Route::post("add-course-schedule", "addCourseSchedule");
            Route::delete("remove-course-schedule/schedule_id}", "removeCourseSchedule");
            Route::post("add-schedule-material", "addScheduleMaterial");
            Route::delete("remove-schedule-material/{material_id}", "removeScheduleMaterial");
            Route::post("add-schedule-task", "addScheduleTask");
            Route::delete("remove-schedule-task", "removeScheduleTask");
            Route::post("add-schedule-Session", "addScheduleSession");
            Route::delete("remove-schedule-Session", "removeScheduleSession");
            //leave till the end
            // Route::get("get-session-attendance","getSessionAttendance");
            // Route::post("add-session-attendance","addSessionAttendance");
            Route::post("add-course-project", "addCourseProject");
            Route::post("add-project-member", "addProjectMembers");
            Route::put("modify-task-grade", "modifyTaskGrade");
            Route::put("modify-project-grade", "modifyProjectGrade");
            Route::post("add-feedback", "addFeedback");
            Route::post("add-notification", "addNotification");

        });

    });

    Route::group(["prefix" => "common"], function () {
        Route::controller(CommonController::class)->group(function () {
            Route::get("get-courses", "getAllCourses");
            Route::get("get-course-students/{course_id}", "getCourseStudents");
            Route::get("get-course-schedules/{course_id}", "getCourseSchedules");
            Route::get("get-schedule-materials/{schedule_id}", "getScheduleMaterials");
            Route::get("get-schedule-tasks/{schedule_id}", "getScheduleTasks");
            Route::get("get-task-submissions/{task_id}", "getTaskSubmissions");
            Route::get("get-schedule-sessions/{schedule_id}", "getScheduleSessions");
            Route::get("get-course-projects/{course_id}", "getCourseProjects");
            Route::get("get-project-members/{project_id}", "getProjectMembers");
            Route::get("get-student-feedback/{course_id}/{student_id}", "getStudentFeedback");
            Route::post("send-message", "sendMessage");
            Route::get("get-messages", "getMessages");
            Route::get("get-course-discussion/{course_id}", "getCourseDiscussion");
            Route::post("add-course-discussion", "addCourseDiscussion");
            Route::get("get-course-notifications/{course_id}", "getCourseNotifications");
            Route::get("get-course-teacher/{course_id}", 'getCourseTeacher');


            // Route::get("unauthorized", [UnauthorizedController::class, "unauthorized"]);
        });
    });

    Route::group(["prefix" => "student", "middleware" => "student.valid"], function () {
        Route::controller(StudentController::class)->group(function () {
            Route::post("enroll-course", "enrollCourse");
            Route::get("get-enrolled-courses", "getEnrolledCourses");
            Route::post("add-submission", 'addTaskSubmission');
            Route::post("add-teacher_meet", "addTeacherMeet");
            Route::get("get-teacher-meet/{teacher_id}", "getTeacherMeet");
            // Route::get("unauthorized", [UnauthorizedController::class, "unauthorized"]);
        });
    });

    Route::group(["prefix" => "admin", "middleware" => "admin.valid"], function () {

        Route::controller(AdminController::class)->group(function () {
            Route::put("modifyUser/{user_id}", "modifyUser");
            Route::delete('/deleteUser/{user}', "deleteUser");
            Route::post('/addCourse', "addCourse");
            Route::put('/modifyCourse/{id}', "modifyCourse");
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
    Route::post("register", "register");

});



Route::get('/send-mail',[MailController::class,'sendMail']);

