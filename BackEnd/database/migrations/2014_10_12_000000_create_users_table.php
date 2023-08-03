<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
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



        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('teacher_id');
            $table->unsignedBigInteger('enrollment_limit');
            $table->text('title');
            $table->text('descripton');
            $table->text('class_code');
            $table->text('meet_link');
            $table->foreign('teacher_id')->references('id')->on('users');

        });

        Schema::create('course_enrollments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('course_id');
            $table->unsignedBigInteger('student_id');
            $table->foreign('course_id')->references('id')->on('courses');
            $table->foreign('student_id')->references('id')->on('users');
        });
        Schema::create('material_types', function (Blueprint $table) {
            $table->id();
            $table->text('name');

        });
        Schema::create('course_materials', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('course_id');
            $table->unsignedBigInteger('teacher_id');
            $table->unsignedBigInteger('material_type');
            $table->text('title');
            $table->text('content');
            $table->text('file');
            $table->foreign('course_id')->references('id')->on('courses');
            $table->foreign('teacher_id')->references('id')->on('users');
            $table->foreign('material_type')->references('id')->on('material_types');

        });

        Schema::create('task_types', function (Blueprint $table) {
            $table->id();
            $table->text('name');

        });

        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('course_id');
            $table->unsignedBigInteger('teacher_id');
            $table->unsignedBigInteger('task_type');
            $table->text('title');
            $table->text('description');
            $table->dateTime('due_date');
            $table->unsignedBigInteger('max_score');
            $table->foreign('course_id')->references('id')->on('courses');
            $table->foreign('teacher_id')->references('id')->on('users');
            $table->foreign('task_type')->references('id')->on('task_types');

        });

        Schema::create('task_submissions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('task_id');
            $table->unsignedBigInteger('teacher_id');
            $table->dateTime('submission_date');
            $table->text('file');
            $table->foreign('task_id')->references('id')->on('tasks');
            $table->foreign('teacher_id')->references('id')->on('users');

        });

        Schema::create('group_projects', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('course_id');
            $table->dateTime('submission_date');
            $table->text('file');
            $table->text('status');
            $table->foreign('course_id')->references('id')->on('courses');
        });

        Schema::create('project_students', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('student_id');
            $table->unsignedBigInteger('project_id');
            $table->unsignedBigInteger('grade');
            $table->foreign('course_id')->references('id')->on('courses');
            $table->foreign('project_id')->references('id')->on('group_projects');
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
