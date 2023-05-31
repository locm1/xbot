<?php

namespace Database\Seeders;

use App\Models\SpecificTrade;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SpecificTradeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            [
                'title' => '販売行者',
                'content' => 'クロスボット株式会社',
            ],
            [
                'title' => '代表責任者',
                'content' => 'クロスボット太郎',
            ],
            [
                'title' => '所在地',
                'content' => '札幌市中央区南一条西5丁目',
            ],
            [
                'title' => '電話番号',
                'content' => '011-222-1085',
            ],
            [
                'title' => '販売価格',
                'content' => '商品紹介ページをご参照ください。',
            ],
        ];

        SpecificTrade::insert($data);
    }
}
