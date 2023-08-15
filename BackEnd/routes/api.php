<?php

use App\Http\Controllers\CommonController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
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
    Route::group(["prefix" => "teacher", "middleware" => "teacher.valid"], function () {
        Route::controller(TeacherController::class)->group(function () {
            //date time  'YYYY-MM-DD hh:mm:ss' 
            Route::get("get-teacher-courses", "getTeacherCourses");
            Route::post("add-course-schedule", "addCourseSchedule");
            Route::post("add-new-course", "addCourse");
            Route::delete("remove-course-schedule/{schedule_id}", "removeCourseSchedule");
            Route::post("add-schedule-material", "addScheduleMaterial");
            Route::delete("remove-schedule-material/{material_id}", "removeScheduleMaterial");
            Route::post("add-schedule-task", "addScheduleTask");
            Route::delete("remove-schedule-task/{task_id}", "removeScheduleTask");
            Route::post("add-schedule-session", "addScheduleSession");
            Route::delete("remove-schedule-session/{session_id}", "removeScheduleSession");
            //leave till the end
            Route::get("get-session-attendance/{session_id}/{student_id}","getSessionAttendance");
            Route::put("add-session-attendance/{attendance_id}","addSessionAttendance");
            // Route::post("add-course-project", "addCourseProject");

            Route::post("add-project-group-members", "addProjectGroupMembers");
            Route::delete("remove-group/{group_id}", "removeGroup");
            Route::put("modify-task-grade", "modifyTaskGrade");
            Route::put("modify-project-grade", "modifyProjectGrade");
            Route::put("add-feedback/{feedback_id?}", "addFeedback");
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
            Route::get("get-project-groups/{course_id}", "getProjectGroups");
            Route::get("get-group-members/{project_id}", "getGroupMembers");
            Route::get("get-student-feedback/{course_id}/{student_id}", "getStudentFeedback");
            Route::post("send-message", "sendMessage");
            Route::get("get-messages", "getMessages");
            Route::get("getMessagesById/{id}", "getMessagesById");
            Route::get("get-course-discussion/{course_id}", "getCourseDiscussion");
            Route::post("add-course-discussion", "addCourseDiscussion");
            Route::get("get-course-notifications/{course_id}", "getCourseNotifications");
            Route::get("get-course-teacher/{course_id}", 'getCourseTeacher');
            Route::get("searchUser/{user_type}/{search}", 'searchUser');
            Route::get("get/{user_type}/{search}", 'searchUser');
            Route::get("get-student-progress/{student_id}/{course_id?}","getStudentProgress");
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
        Route::controller(ParentController::class)->group(function () {
            Route::get("get-child", "getChild");
            Route::get("get-child-courses", "getChildCourses");
            Route::get("get-child-teachers", "getChildTeachers");
            Route::get("get-child-attendance", "getChildAttendance");
            Route::get("get-child-course-schedules", "getChildCourseSchedules");
            Route::get("get-teacher-conference-slots/{teacherId}", "getTeacherConferenceSlots");
            Route::post("schedule-conference-with-teacher/{teacherId}", "scheduleConferenceWithTeacher");
        });
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
