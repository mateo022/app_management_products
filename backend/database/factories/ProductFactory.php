<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "product_name" => fake()->unique()->words(8, true),
            "product_reference" => fake()->words(5, true),
            "product_size" => fake()->words(5, true),
            "product_description" => fake()->words(15, true),
            "product_image" => fake()->words(9, true),
            "category_id" => fake()->numberBetween(1, 50),
            "product_price" =>fake()->randomFloat(45000, 50000, 40000),
        ];
    }
}
