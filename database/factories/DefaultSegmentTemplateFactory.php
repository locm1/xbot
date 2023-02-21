<?php

namespace Database\Factories;

use App\Models\DefaultSegmentItem;
use App\Models\SegmentTemplate;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class DefaultSegmentTemplateFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $default_segment_ids = DefaultSegmentItem::pluck('id')->all();
        $segment_template_ids = SegmentTemplate::pluck('id')->all();
        return [
            'default_segment_item_id' => fake()->unique()->randomElement($default_segment_ids),
            'segment_template_id' => fake()->unique()->randomElement($segment_template_ids),
            'value' => '1'
        ];
    }
}
