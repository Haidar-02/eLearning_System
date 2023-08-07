<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Course>
 */
class CourseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        return [
            "teacher_id" => User::all()->where("user_type", 2)->random(),
            'enrollment_limit' => 30,
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'class_code' => $this->faker->unique()->bothify('??##??##'),
            'meet_link' => $this->faker->url,
        ];

    }
}