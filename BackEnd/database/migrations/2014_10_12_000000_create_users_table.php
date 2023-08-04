<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {

        // USERS
        Schema::create('user_types', function (Blueprint $table) {
            $table->id();
            $table->text('name');
        });

        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->text('name');
            $table->text('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->text('password');
            $table->unsignedBigInteger('user_type');
            $table->rememberToken();
            $table->timestamps();
            $table->foreign('user_type')->references('id')->on('user_types');
        });


        Schema::create('parent_relations', function (Blueprint $table) {
            $table->id();
            $table->text('name');
            $table->unsignedBigInteger('parent_id');
            $table->unsignedBigInteger('student_id');
            $table->foreign('parent_id')->references('id')->on('users');
            $table->foreign('student_id')->references('id')->on('users');
        });



        //COURSES
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('teacher_id');
            $table->unsignedBigInteger('enrollment_limit');
            $table->text('title');
            $table->text('description');
            $table->text('class_code');
            $table->text('meet_link')->nullable();
            $table->foreign('teacher_id')->references('id')->on('users');

        });

        Schema::create('course_enrollments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('course_id');
            $table->unsignedBigInteger('student_id');
            $table->foreign('course_id')->references('id')->on('courses');
            $table->foreign('student_id')->references('id')->on('users');
        });

        Schema::create('schedules', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('course_id');
            $table->dateTime("start_date");
            $table->dateTime("end_date");
            $table->foreign('course_id')->references('id')->on('courses');
        });



        Schema::create('course_materials', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('schedule_id');
            $table->unsignedBigInteger('teacher_id');
            $table->unsignedBigInteger('material_type');
            $table->text('title');
            $table->text('content');
            $table->text('file_path_url')->nullable();
            $table->foreign('schedule_id')->references('id')->on('schedules');
            $table->foreign('teacher_id')->references('id')->on('users');
        });

        // Tasks
        Schema::create('task_types', function (Blueprint $table) {
            $table->id();
            $table->text('name');

        });


        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->text('title');
            $table->text('description');
            $table->dateTime('due_date');
            $table->integer('max_score')->default(100);
            $table->unsignedBigInteger('schedule_id');
            $table->unsignedBigInteger('teacher_id');
            $table->unsignedBigInteger('task_type');
            $table->foreign('schedule_id')->references('id')->on('schedules');
            $table->foreign('teacher_id')->references('id')->on('users');
            $table->foreign('task_type')->references('id')->on('task_types');

        });


        Schema::create('task_submissions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('task_id');
            $table->unsignedBigInteger('student_id');
            $table->dateTime('submission_date');
            $table->text('file_path');
            $table->integer('grade')->nullable();
            $table->foreign('task_id')->references('id')->on('tasks');
            $table->foreign('student_id')->references('id')->on('users');
        });


        Schema::create('sessions', function (Blueprint $table) {
            $table->id();
            $table->dateTime("date");
        });

        Schema::create('attendance_status', function (Blueprint $table) {
            $table->id();
            $table->string("status");
        });

        Schema::create('attendances', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('student_id');
            $table->unsignedBigInteger('session_id');
            $table->unsignedBigInteger('status');
            $table->dateTime('date');
            $table->foreign('student_id')->references('id')->on('users');
            $table->foreign('session_id')->references('id')->on('sessions');
        });


        Schema::create('group_projects', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('course_id');
            $table->dateTime('submission_date');
            $table->text('file_path');
            $table->text('status');
            $table->integer('grade');
            $table->foreign('course_id')->references('id')->on('courses');
        });

        Schema::create('student_projects', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('student_id');
            $table->unsignedBigInteger('project_id');
            $table->foreign('student_id')->references('id')->on('users');
            $table->foreign('project_id')->references('id')->on('group_projects');
        });

        Schema::create('board_messages', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('course_id');
            $table->mediumText('message');
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('course_id')->references('id')->on('courses');
        });

        Schema::create('feedbacks', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('teacher_id');
            $table->unsignedBigInteger('student_id');
            $table->unsignedBigInteger('course_id');
            $table->mediumText('rating');
            $table->mediumText('comment');
            $table->foreign('teacher_id')->references('id')->on('users');
            $table->foreign('student_id')->references('id')->on('users');
            $table->foreign('course_id')->references('id')->on('courses');
        });


        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->text('notification');
            $table->unsignedBigInteger('course_id');
            $table->foreign('course_id')->references('id')->on('courses');
        });

        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->text('message');
            $table->unsignedBigInteger('sender');
            $table->unsignedBigInteger('reciever');
            $table->foreign('sender')->references('id')->on('users');
            $table->foreign('reciever')->references('id')->on('users');
            $table->timestamp('created_at')->useCurrent();
        });

        Schema::create('teacher_meet_schedules', function (Blueprint $table) {
            $table->id();
            $table->text("location")->nullable();
            $table->string("meet_link")->nullable();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('teacher_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('teacher_id')->references('id')->on('users');
            $table->timestamp('created_at')->useCurrent();
            $table->dateTime("start_time");
            $table->dateTime("end_time");
        });

        Schema::create('themes', function (Blueprint $table) {
            $table->id();
            $table->text("name");
            $table->text("background_color");
            $table->text("font_color");
        });
        Schema::create('email_templates', function (Blueprint $table) {
            $table->id();
            $table->mediumText("html");
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};