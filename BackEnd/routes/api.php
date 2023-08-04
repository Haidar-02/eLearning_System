<?php

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
    Route::group(["prefix"=>"teacher","middleware" => "teacher.valid"], function () {
    });
    Route::group(["prefix"=>"student","middleware" => "student.valid"], function () {
    });
    
    Route::group(["prefix"=>"admin","middleware" => "admin.valid"], function () {
    });
    
    Route::group(["prefix"=>"parent","middleware" => "parent.valid"], function () {
    });
});



Route::post("login", [AuthController::class, "login"]);
Route::post("register", [AuthController::class, "register"]);