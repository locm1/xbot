<?php

namespace Database\Seeders;

use App\Models\ProductSale;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSaleSeeder extends Seeder
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
                'product_id' => 1,
                'discount_rate' => 10,
                'start_date' => "2022-1-1",
                'end_date' => "2023-12-25",
            ],
            [
                'product_id' => 2,
                'discount_rate' => 10,
                'start_date' => "2022-1-1",
                'end_date' => "2023-12-25",
            ],
            [
                'product_id' => 3,
                'discount_rate' => 10,
                'start_date' => "2022-1-1",
                'end_date' => "2023-12-25",
            ],
            [
                'product_id' => 4,
                'discount_rate' => 10,
                'start_date' => "2022-1-1",
                'end_date' => "2023-12-25",
            ],
        ];
        ProductSale::insert($data);
    }
}
