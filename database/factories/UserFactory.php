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
        $img_path = str_replace('public', '', fake()->optional('90')->file('resources/assets/img/team', 'public/images/test_img'));
        
        return [
            'first_name' => fake()->optional('90')->firstName(),
            'last_name' => fake()->optional('90')->lastName(),
            'first_name_kana' => fake()->optional('90')->firstKanaName(),
            'last_name_kana' => fake()->optional('90')->lastKanaName(),
            'nickname' => fake()->shuffleString($random_str),
            'birth_date' => fake()->optional('90')->date(),
            'sex' => fake()->optional('90')->numberBetween(1, 3),
            'area' => fake()->optional('90')->city(),
            'tel' => str_replace(array('-', 'ー', '−', '―', '‐'), '', fake()->optional('90')->phoneNumber()),
            'occupation' => fake()->optional('90')->jobTitle(),
            'img_path' => $img_path,
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
