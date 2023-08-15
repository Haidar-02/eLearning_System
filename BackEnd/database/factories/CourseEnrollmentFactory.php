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
        return [
            "student_id" => User::all()->where("user_type", 4)->random(),
            "course_id" => Course::all()->random(),
            "grade" => null,
        ];
    }
    public function configure()
    {
        return $this->afterMaking(function (CourseEnrollment $courseEnrollment) {
            $uniqueCourseAndStudent = CourseEnrollment::where('course_id', $courseEnrollment->course_id)
                ->where('student_id', $courseEnrollment->student_id)
                ->count();

            if ($uniqueCourseAndStudent > 0) {
                $this->configure();
            }
        });
    }
}