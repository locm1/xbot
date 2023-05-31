<?php

namespace Database\Seeders;

use App\Models\GreetingMessage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GreetingMessageSeeder extends Seeder
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
                'type' => 1,
                'text' => '友達追加いただきありがとうございます！よろしければ下記アンケートにお答えください！',
                'image_path' => null,
                'video_path' => null,
            ],
            [
                'type' => 2,
                'text' => '',
                'image_path' => $img_path,
                'video_path' => null,
            ],
        ];

        GreetingMessage::insert($data);
    }
}
