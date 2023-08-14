<?php

namespace Database\Factories;

use App\Models\Course;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Schedule;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CourseMaterial>
 */
class CourseMaterialFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'course_id' => Course::all()->pluck('id')->random(),
            'schedule_id' => Schedule::all()->pluck('id')->random(),
            'teacher_id' => User::where('user_type', 2)->pluck('id')->random(),
            'title' => $this->faker->sentence,
            'content' => $this->faker->paragraph,
            'file_path' => null,
        ];
    }
}