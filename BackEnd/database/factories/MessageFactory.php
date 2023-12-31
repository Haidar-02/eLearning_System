<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Message>
 */
class MessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $senderId = User::inRandomOrder()->first()->id;
        $receiverId = User::where('id', '!=', $senderId)->inRandomOrder()->first()->id;

        return [
            'message' => $this->faker->sentence,
            'sender_id' => $senderId,
            'receiver_id' => $receiverId,
            'created_at' => now(),
        ];
    }
}