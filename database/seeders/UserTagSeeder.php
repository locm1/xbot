<?php

namespace Database\Seeders;

use App\Models\UserTag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserTagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {   
        $tags = ['常連', 'キャンプ好き', '学生', '社会人', 'ショートヘア', 'ロングヘア'];

        $data = [];
        foreach ($tags as $k => $v) {
            $data[] = [
                'name' => $v,
            ];
        }

        UserTag::insert($data);
    }
}
