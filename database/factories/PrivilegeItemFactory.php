<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Privilege;
use App\Models\PrivilegeItem;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PrivilegeItem>
 */
class PrivilegeItemFactory extends Factory
{
    protected $model = PrivilegeItem::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $products = file(database_path('resources/products.txt'), FILE_IGNORE_NEW_LINES);

        return [
            'privilege_id' => fake()->numberBetween(1, 5),
            'name' => fake()->randomElement($products),
        ];
    }
}
