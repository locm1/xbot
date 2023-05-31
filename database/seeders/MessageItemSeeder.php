<?php

namespace Database\Seeders;

use App\Models\MessageItem;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MessageItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $img_path = str_replace('storage/app/public/message', '/storage/message', fake()->file('resources/assets/img/products', 'storage/app/public/message'));
        $data = [
            [
                'message_id' => '1',
                'type' => 1,
                'text' => '今なら友達紹介で20％OFFクーポン付与！',
                'image_path' => null,
                'video_path' => null,
            ],
            [
                'message_id' => '1',
                'type' => 2,
                'text' => '',
                'image_path' => $img_path,
                'video_path' => null,
            ],
        ];

        MessageItem::insert($data);
    }
}
