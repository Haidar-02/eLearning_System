<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\AttendanceStatus;
use App\Models\Course;
use App\Models\CourseEnrollment;
use App\Models\CourseMaterial;
use App\Models\Message;
use App\Models\ParentRelation;
use App\Models\Task;
use App\Models\TaskSubmission;
use App\Models\TaskType;
use App\Models\UserType;
use App\Models\Schedule;
use App\Models\User;


use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        UserType::create(['name' => 'Admin']);
        UserType::create(['name' => 'Teacher']);
        UserType::create(['name' => 'Parent']);
        UserType::create(['name' => 'Student']);

        AttendanceStatus::create(['status'=>'present']);
        AttendanceStatus::create(['status'=>'absent']);
        AttendanceStatus::create(['status'=>'late']);


        TaskType::create(['name' => 'assignment']);
        TaskType::create(['name' => 'quiz']);

        User::create(['name' => 'admin', 'email' => "admin@admin.com", "password" => "adminadmin", "user_type" => "1"]);
        User::factory(20)->create();
        ParentRelation::factory(10)->create();

        Course::factory(10)->create();
        CourseEnrollment::factory(20)->create();
        Message::factory(100)->create();
        Schedule::factory(50)->create();
        CourseMaterial::factory(50)->create();
        Task::factory(100)->create();
        TaskSubmission::factory(50)->create();



    }
}