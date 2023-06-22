<?php

namespace Database\Seeders;

use App\Models\EcommerceConfiguration;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EcommerceConfigurationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        EcommerceConfiguration::create([
            'target_amount' => null,
            'postage' => null,
            'is_enabled' => 0,
            'cash_on_delivery_fee' => null,
            'tel' => null,
            'email' => null,
            'email_sender_name' => null,
        ]);
    }
}
