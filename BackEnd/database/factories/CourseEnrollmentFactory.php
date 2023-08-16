<?php

namespace Database\Factories;

use App\Models\Course;
use App\Models\CourseEnrollment;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CourseEnrollment>
 */
class CourseEnrollmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        do {
            $course_id = Course::factory()->create()->id;
            $student_id = User::factory()->create()->id;
        } while (CourseEnrollment::where('course_id', $course_id)->where('student_id', $student_id)->exists());

        return [
            'course_id' => $course_id,
            'student_id' => $student_id,
            'grade' => null
        ];
    }
  
}