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
            'label' => '男性',
            'value' => 1,
        ]);
        DefaultSegmentItem::create([
            'default_segment_id' => 1,
            'label' => '女性',
            'value' => 2
        ]);
        DefaultSegmentItem::create([
            'default_segment_id' => 1,
            'label' => 'その他',
            'value' => 3
        ]);
        for ($i=1; $i < 13; $i++) { 
            DefaultSegmentItem::create([
                'default_segment_id' => 3,
                'label' => $i . '月',
                'value' => $i
            ]);
        }
        foreach (PrefectureConsts::ALL_PREFECTURES as $value) {
            DefaultSegmentItem::create([
                'default_segment_id' => 5,
                'label' => $value,
                'value' => $value,
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
