<?php

namespace Database\Seeders;

use App\Consts\PrefectureConsts;
use App\Consts\OccupationConsts;
use App\Models\DefaultSegmentItem;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DefaultSegmentItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DefaultSegmentItem::create([
            'default_segment_id' => 1,
            'name' => '男性',
        ]);
        DefaultSegmentItem::create([
            'default_segment_id' => 1,
            'name' => '女性',
        ]);
        DefaultSegmentItem::create([
            'default_segment_id' => 1,
            'name' => 'その他',
        ]);
        for ($i=1; $i < 13; $i++) { 
            DefaultSegmentItem::create([
                'default_segment_id' => 3,
                'name' => $i . '月',
            ]);
        }
        foreach (PrefectureConsts::ALL_PREFECTURES as $value) {
            DefaultSegmentItem::create([
                'default_segment_id' => 5,
                'name' => $value,
            ]);
        }
        // foreach (OccupationConsts::ALL_OCCUPATIONS as $value) {
        //     DefaultSegmentItem::create([
        //         'default_segment_id' => 6,
        //         'name' => $value,
        //     ]);
        // }
    }
}
