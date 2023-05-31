<?php

namespace Database\Seeders;

use App\Models\Message;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MessageSeeder extends Seeder
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
                'title' => '商品紹介テンプレート',
                'is_undisclosed' => 0,
                'created_at' => '2023-05-30 10:00:00'
            ],
            [
                'title' => '新規入会テンプレート',
                'is_undisclosed' => 0,
                'created_at' => '2023-05-30 10:00:00'
            ],
            [
                'title' => 'リテンションテンプレート',
                'is_undisclosed' => 0,
                'created_at' => '2023-05-30 10:00:00'
            ],
            [
                'title' => '継続顧客向けテンプレート',
                'is_undisclosed' => 0,
                'created_at' => '2023-05-30 10:00:00'
            ],
            [
                'title' => '友達紹介催促テンプレート',
                'is_undisclosed' => 0,
                'created_at' => '2023-05-30 10:00:00'
            ],
            
        ];

        Message::insert($data);
        
    }
}
