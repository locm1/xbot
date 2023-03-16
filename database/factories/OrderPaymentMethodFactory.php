<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class OrderPaymentMethodFactory extends Factory
{
    private function mb_str_shuffle(int $max): string
    {
        $randoms = array();
        for ($i = 0; $i < $max; $i++) { 
            $randoms[] = fake()->randomAscii();
        }
        return implode("", $randoms);
    }
    
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $user_ids = User::pluck('id')->all();

        return [
            'user_id' => fake()->randomElement($user_ids),
            'payment_method' => fake()->numberBetween(1, 5),
            'payjp_customer_id' => $this->mb_str_shuffle(20),
        ];
    }
}
