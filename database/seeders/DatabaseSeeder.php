<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Event;
use App\Models\Privilege;
use App\Models\PrivilegeItem;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\ProductContent;
use App\Models\ProductImage;
use App\Models\Tag;
use Database\Factories\ProductContentFactory;
use Database\Factories\ProductImageFactory;
use App\Models\EventUser;
use App\Models\Occupation;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            AdminTableSeeder::class,
            PrefecturesTableSeeder::class
        ]);
        
        Occupation::factory(10)->create();
        User::factory(100)->create();
        Event::factory(20)->create();
        Privilege::factory(5)->create();
        PrivilegeItem::factory(20)->create();
        Tag::factory(5)->create();
        ProductCategory::factory(10)->create();
        Product::factory(50)->create();
        ProductImage::factory(70)->create();
        ProductContent::factory(70)->create();
        EventUser::factory(50)->create();
    }
}
