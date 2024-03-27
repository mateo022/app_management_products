<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     * 
     */
    protected static ?string $imgHash;

    public function definition(): array
    {
        return [
            "img" => static::$imgHash ??= Hash::make('image'),
            "name" => fake()->words(15, true),
            "description" => fake()->words(15, true),
            "status" => fake()->numberBetween(0, 1),
        ];
    }
}
