<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProductSale>
 */
class ProductSaleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $start_date = fake()->dateTimeThisMonth('+1 month');
        $end_date = fake()->dateTimeInInterval($start_date, '+3 days');

        return [
            'discount_rate' => fake()->randomNumber(2),
            'start_date' => $start_date,
            'end_date' => $end_date,
        ];
    }
}
