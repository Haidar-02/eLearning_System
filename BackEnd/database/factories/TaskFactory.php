<?php

namespace Database\Factories;

use App\Models\Course;
use App\Models\Schedule;
use App\Models\TaskType;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'due_date' => $this->faker->dateTimeBetween('+1 day', '+4 weeks'),
            'max_score' => 100,
            'schedule_id' => Schedule::all()->pluck('id')->random(),
            'teacher_id' => User::where('user_type', 2)->pluck('id')->random(),
            'task_type' => TaskType::all()->pluck('id')->random(),
            'course_id' => Course::all()->pluck('id')->random(),
        ];
    }
}