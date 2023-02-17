<?php

namespace Database\Factories;

use App\Models\TagUser;
use App\Models\User;
use App\Models\UserTag;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class TagUserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $user_ids = User::pluck('id')->all();
        $tag_ids = UserTag::pluck('id')->all();

        return [
            'user_id' => fake()->randomElement($user_ids),
            'user_tag_id' => fake()->randomElement($tag_ids)
        ];
    }
}
