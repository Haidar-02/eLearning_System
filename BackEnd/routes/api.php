<?php

use App\Http\Controllers\StudentController;
use App\Http\Controllers\UnauthorizedController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;


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
    Route::group(["prefix" => "student", "middleware" => "student.valid"], function () {
        Route::controller(StudentController::class)->group(function () {
            Route::get("get-courses", "getAllCourses");
            Route::post("enroll-course", "enrollCourse");
            Route::get("enrolled-courses", "enrolledCourses");
            Route::get("course-schedules/{course_id}", "getCourseSchedules");
            Route::get("schedule-materials/{course_id}/{schedule_id}", "getScheduleMaterials");

            // Route::get("unauthorized", [UnauthorizedController::class, "unauthorized"]);
        });
    });

    Route::group(["prefix" => "admin", "middleware" => "admin.valid"], function () {
        Route::controller(AuthController::class)->group(function () {
            Route::post("register", "register");
        });
    });

    Route::group(["prefix" => "parent", "middleware" => "parent.valid"], function () {
    });
});

Route::controller(AuthController::class)->group(function () {
    Route::post("login", "login");
});