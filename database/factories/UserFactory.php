<?php

namespace Database\Factories;

use Carbon\Carbon;
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
        $timestamp = fake()->optional('90')->unixTime();
        $date = $timestamp ? date('Y-m-d H:i:s', $timestamp) : null;
        
        return [
            'first_name' => fake()->optional('90')->firstName(),
            'last_name' => fake()->optional('90')->lastName(),
            'first_name_kana' => fake()->optional('90')->firstKanaName(),
            'last_name_kana' => fake()->optional('90')->lastKanaName(),
            'nickname' => fake()->shuffleString($random_str),
            'birth_date' => fake()->date(),
            'gender' => fake()->optional('90')->numberBetween(1, 3),
            'zipcode' => fake()->optional('90')->postcode(),
            'prefecture' => fake()->optional('90')->prefecture(),
            'city' => fake()->optional('90')->city(),
            'address' => fake()->optional('90')->streetAddress(),
            'building_name' => fake()->optional('90')->secondaryAddress(),
            'tel' => str_replace(array('-', 'ー', '−', '―', '‐'), '', fake()->optional('90')->phoneNumber()),
            'occupation_id' => fake()->optional('90')->numberBetween(1, 10),
            'img_path' => $img_path,
            'line_id' => $this->mb_str_shuffle(20),
            'block_date' => $date,
            'is_blocked' => fake()->numberBetween(0, 1),
            'is_registered' => fake()->numberBetween(0, 1)
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
