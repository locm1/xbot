<?php

namespace Database\Seeders;

use App\Models\ProductCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductCategorySeeder extends Seeder
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
                'name' => '美容',
                'content' => '美容系のカテゴリです。',
                'is_undisclosed' => 0,
                'display_order' => 1
            ],
            [
                'name' => '男性向け',
                'content' => '男性向けのカテゴリです。',
                'is_undisclosed' => 0,
                'display_order' => 2
            ],
            [
                'name' => '女性向け',
                'content' => '女性向けのカテゴリです。',
                'is_undisclosed' => 0,
                'display_order' => 3
            ],
        ];

        ProductCategory::insert($data);
    }
}
