<?php

namespace Database\Factories;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TaskSubmission>
 */
class TaskSubmissionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'task_id' => Task::all()->pluck('id')->random(),
            'student_id' => User::where('user_type', 4)->pluck('id')->random(),
            'submission_date' => $this->faker->dateTimeBetween('-2 weeks', 'now'),
            'file_path' => $this->faker->url(),
            'grade' => null,
            'status' => $this->faker->randomElement(['late', 'missing', 'submitted']),
        ];
    }
}