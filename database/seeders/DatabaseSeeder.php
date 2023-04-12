<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\App;

use App\Models\Admin;
use App\Models\Coupon;
use App\Models\CouponUser;
use App\Models\DefaultInviteIncentive;
use App\Models\Event;
use App\Models\Privilege;
use App\Models\PrivilegeItem;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\ProductContent;
use App\Models\ProductImage;
use App\Models\EventUser;
use App\Models\GreetingMessage;
use App\Models\Invitation;
use App\Models\InvitationUser;
use App\Models\InviteeIncentiveUser;
use App\Models\InviteHistory;
use App\Models\InviteIncentive;
use App\Models\InviteIncentiveUser;
use App\Models\InviterIncentiveUser;
use App\Models\Message;
use App\Models\MessageItem;
use App\Models\Occupation;
use App\Models\Order;
use App\Models\OrderDestination;
use App\Models\OrderHistory;
use App\Models\OrderPaymentMethod;
use App\Models\OrderProduct;
use App\Models\ProductSale;
use App\Models\Questionnaire;
use App\Models\QuestionnaireAnswer;
use App\Models\QuestionnaireAnswerItem;
use App\Models\QuestionnaireItem;
use App\Models\RelatedProduct;
use App\Models\ReserveHistory;
use App\Models\TagUser;
use App\Models\User;
use App\Models\UserTag;
use App\Models\VisitorHistory;
use Database\Factories\CouponUserFactory;
use Database\Factories\InviterIncentiveUserFactory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $environment = App::environment();

        Storage::disk('public')->makeDirectory('greeting');
        Storage::disk('public')->makeDirectory('richmenu');
        Storage::disk('public')->makeDirectory('message');
        Storage::disk('public')->makeDirectory('products');
        Storage::disk('public')->makeDirectory('video');

        if ($environment  === 'local') {
            $this->call([
                AdminTableSeeder::class,
                PrefecturesTableSeeder::class,
                PrivacyPoliciesTableSeeder::class,
                DefaultSegmentSeeder::class,
                DefaultSegmentItemSeeder::class,
                TermsOfServicesTableSeeder::class,
                PagesTableSeeder::class,
                UserSeeder::class,
                InflowRouteSeeder::class,
            ]);
            Admin::factory(10)->create();
            Occupation::factory(10)->create();
            User::factory(100)->create();
            Event::factory(20)->create();
            Privilege::factory(5)->create();
            PrivilegeItem::factory(20)->create();
            UserTag::factory(5)->create();
            ProductCategory::factory(10)->create();
            Product::factory(50)->create()->each(function($product) {
                ProductSale::factory()->create(['product_id' => $product->id]);
            });
            ProductImage::factory(200)->create();
            ProductContent::factory(70)->create();
            EventUser::factory(50)->create();
            Questionnaire::factory(10)->create();
            QuestionnaireItem::factory(30)->create();
            QuestionnaireAnswer::factory(100)->create();
            QuestionnaireAnswerItem::factory(300)->create();
            TagUser::factory(100)->create();
            Coupon::factory(100)->create();
            CouponUser::factory(100)->create();
            VisitorHistory::factory(100)->create();
            OrderDestination::factory(100)->create();
            Order::factory(200)->create();
            OrderProduct::factory(500)->create();
            InviteHistory::factory(100)->create();
            ReserveHistory::factory(300)->create();
            RelatedProduct::factory(300)->create();
            InviteIncentive::factory(100)->create();
            InviterIncentiveUser::factory(100)->create()->each(function($inviter_incentive_user) {
                InviteeIncentiveUser::factory()->create(['inviter_incentive_user_id' => $inviter_incentive_user->id]);
            });
            DefaultInviteIncentive::factory(1)->create();
            Message::factory(100)->create();
            MessageItem::factory(200)->create();
            GreetingMessage::factory(3)->create();
            OrderPaymentMethod::factory(100)->create();
        } else if ($environment  === 'stg') {
            $this->call([
                AdminTableSeeder::class,
            ]);
        }
    }
}
