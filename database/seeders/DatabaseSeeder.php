<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Admin;
use App\Models\Coupon;
use App\Models\Event;
use App\Models\Privilege;
use App\Models\PrivilegeItem;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\ProductContent;
use App\Models\ProductImage;
use App\Models\EventUser;
use App\Models\InviteHistory;
use App\Models\Occupation;
use App\Models\OrderHistory;
use App\Models\OrderProduct;
use App\Models\OrderUser;
use App\Models\Questionnaire;
use App\Models\QuestionnaireAnswer;
use App\Models\QuestionnaireAnswerItem;
use App\Models\QuestionnaireItem;
use App\Models\TagUser;
use App\Models\User;
use App\Models\UserTag;
use App\Models\VisitorHistory;
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
        Admin::factory(10)->create();
        Occupation::factory(10)->create();
        User::factory(100)->create();
        Event::factory(20)->create();
        Privilege::factory(5)->create();
        PrivilegeItem::factory(20)->create();
        UserTag::factory(5)->create();
        ProductCategory::factory(10)->create();
        Product::factory(50)->create();
        ProductImage::factory(70)->create();
        ProductContent::factory(70)->create();
        EventUser::factory(50)->create();
        Questionnaire::factory(10)->create();
        QuestionnaireItem::factory(30)->create();
        QuestionnaireAnswer::factory(100)->create();
        QuestionnaireAnswerItem::factory(300)->create();
        TagUser::factory(100)->create();
        Coupon::factory(100)->create();
        VisitorHistory::factory(100)->create();
        OrderUser::factory(100)->create();
        OrderHistory::factory(200)->create();
        OrderProduct::factory(500)->create();
        InviteHistory::factory(100)->create();
    }
}
