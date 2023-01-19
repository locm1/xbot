<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */


    private function mb_str_shuffle(int $max): string
    {
        $randoms = array();
        for ($i = 0; $i < $max; $i++) { 
            $randoms[] = fake()->randomAscii();
        }
        return implode("", $randoms);
    }

    public function definition()
    {
        $random_str = fake()->name() .fake()->emoji() .strval(fake()->randomDigit()) .fake()->randomAscii() .fake()->kanaName();
        
        return [
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'first_name_kana' => fake()->firstKanaName(),
            'last_name_kana' => fake()->lastKanaName(),
            'nickname' => fake()->shuffleString($random_str),
            'birth_date' => fake()->date(),
            'sex' => fake()->numberBetween(1, 3),
            'area' => fake()->city(),
            'tel' => str_replace(array('-', 'ー', '−', '―', '‐'), '', fake()->phoneNumber()),
            'occupation' => fake()->jobTitle(),
            'is_registered' => fake()->numberBetween(0, 1),
            'line_id' => $this->mb_str_shuffle(20),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return static
     */
    public function unverified()
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
