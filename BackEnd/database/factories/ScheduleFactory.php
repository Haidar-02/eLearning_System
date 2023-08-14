<?php

namespace Database\Factories;

use App\Models\Course;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Schedule>
 */
class ScheduleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $durationInDays = $this->faker->numberBetween(7, 56);
        $startDate = $this->faker->dateTimeBetween('now', "+{$durationInDays} days");
        $endDate = $this->faker->dateTimeBetween(
            $startDate,
            $startDate->format('Y-m-d H:i:s') . " +{$durationInDays} days"
        );

        return [
            'course_id' => Course::all()->pluck('id')->random(),
            'name' => $this->faker->word,
            'start_date' => $startDate,
            'end_date' => $endDate,
        ];
    }
}