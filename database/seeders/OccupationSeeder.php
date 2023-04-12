<?php

namespace Database\Seeders;

use App\Models\Occupation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OccupationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $occupations = ['会社員', '公務員', '自営業', '会社役員', '自由業', '専業主婦(夫)', '専業主婦(妻)', '学生', 'パート・アルバイト', '無職'];

        $data = [];
        foreach ($occupations as $k => $v) {
            $data[] = [
                'name' => $v,
            ];
        }

        Occupation::insert($data);
    }
}
