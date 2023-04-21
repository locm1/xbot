<?php

namespace Database\Seeders;

use App\Models\DefaultInviteIncentive;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DefaultInviteIncentiveSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            'invite_incentive_id' => 1,
        ];
        DefaultInviteIncentive::create($data);
    }
}
