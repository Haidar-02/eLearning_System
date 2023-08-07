<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ParentRelation>
 */
class ParentRelationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "name" => " ",
            "parent_id" => User::all()->where('user_type', 3)->random(),
            "student_id" => User::all()->where('user_type', 4)->random()
        ];
    }
}