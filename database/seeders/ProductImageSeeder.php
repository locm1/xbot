<?php

namespace Database\Seeders;

use App\Models\ProductImage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductImageSeeder extends Seeder
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
                'product_id' => '1',
                'image_path' => '/images/demo_shampoo.jpg',
            ],
            [
                'product_id' => '2',
                'image_path' => '/images/demo_treatment.jpg',
            ],
            [
                'product_id' => '3',
                'image_path' => '/images/demo_oil.jpg',
            ],
            [
                'product_id' => '4',
                'image_path' => '/images/demo_wax.jpg',
            ],
        ];

        ProductImage::insert($data);
    }
}
