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
            'name' => '性別',
            'type' => 1,
        ]);
        DefaultSegment::create([
            'id' => 2,
            'name' => '年齢',
            'type' => 2,
        ]);
        DefaultSegment::create([
            'id' => 3,
            'name' => '誕生月',
            'type' => 1,
        ]);
        DefaultSegment::create([
            'id' => 4,
            'name' => '来店回数',
            'type' => 2,
        ]);
        DefaultSegment::create([
            'id' => 5,
            'name' => '都道府県',
            'type' => 1,
        ]);
        DefaultSegment::create([
            'id' => 6,
            'name' => 'お住まいエリア',
            'type' => 4,
        ]);
        // DefaultSegment::create([
            // 'id' => 6,
        //     'name' => '職業',
        //     'type' => 1,
        // ]);
        DefaultSegment::create([
            'id' => 8,
            'name' => '来店回数',
            'type' => 2,
        ]);
        DefaultSegment::create([
            'id' => 9,
            'name' => '最終来店日',
            'type' => 3,
        ]);
        DefaultSegment::create([
            'id' => 10,
            'name' => '購入回数',
            'type' => 2,
        ]);
    }
}
