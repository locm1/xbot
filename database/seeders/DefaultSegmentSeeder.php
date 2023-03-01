<?php

namespace Database\Seeders;

use App\Models\DefaultSegment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DefaultSegmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DefaultSegment::create([
            'id' => 1,
            'display_order' => 1,
            'title' => '性別',
            'name' => 'gender',
            'type' => 1,
        ]);
        DefaultSegment::create([
            'id' => 2,
            'display_order' => 2,
            'title' => '年齢',
            'name' => 'age',
            'type' => 2,
        ]);
        DefaultSegment::create([
            'id' => 3,
            'display_order' => 3,
            'title' => '誕生月',
            'name' => 'birth_date',
            'type' => 1,
        ]);
        DefaultSegment::create([
            'id' => 5,
            'display_order' => 4,
            'title' => '都道府県',
            'name' => 'prefecture',
            'type' => 1,
        ]);
        DefaultSegment::create([
            'id' => 6,
            'display_order' => 5,
            'title' => 'お住まいエリア',
            'name' => 'residence',
            'type' => 4,
        ]);
        // DefaultSegment::create([
            // 'id' => 6,
            // 'display_order' => 1,
        //     'title' => '職業',
        // 'name' => ''
        //     'type' => 1,
        // ]);
        DefaultSegment::create([
            'id' => 7,
            'display_order' => 7,
            'title' => '来店回数',
            'name' => 'visit_count',
            'type' => 2,
        ]);
        DefaultSegment::create([
            'id' => 8,
            'display_order' => 8,
            'title' => '最終来店日',
            'name' => 'last_visit_date',
            'type' => 3,
        ]);
        DefaultSegment::create([
            'id' => 9,
            'display_order' => 9,
            'title' => '購入回数',
            'name' => 'buy_count',
            'type' => 2,
        ]);
    }
}
