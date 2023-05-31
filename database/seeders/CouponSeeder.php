<?php

namespace Database\Seeders;

use App\Models\Coupon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CouponSeeder extends Seeder
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
                'name' => 'オープン記念クーポン',
                'upper_limit' => 50,
                'discount_price' => 30,
                'code' => fake()->unique()->hexColor(),
            ],
            [
                'name' => '春休みクーポン',
                'upper_limit' => 50,
                'discount_price' => 30,
                'code' => fake()->unique()->hexColor(),
            ],
            [
                'name' => '誕生日クーポン',
                'upper_limit' => 50,
                'discount_price' => 30,
                'code' => fake()->unique()->hexColor(),
            ],
            [
                'name' => '記念日クーポン',
                'upper_limit' => 50,
                'discount_price' => 30,
                'code' => fake()->unique()->hexColor(),
            ],
        ];

        Coupon::insert($data);
    }
}
