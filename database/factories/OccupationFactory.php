<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class OccupationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $occupations = ['会社員', '公務員', '自営業', '会社役員', '自由業', '専業主婦(夫)', '専業主婦(妻)', '学生', 'パート・アルバイト', '無職'];

        return [
            'name' => fake('en_US')->unique()->jobTitle()
        ];
    }
}
