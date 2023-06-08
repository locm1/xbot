<?php

use App\Http\Controllers\api\liff\cart\CartController;
use App\Http\Controllers\api\liff\coupon\CouponController as LiffCouponController;
use App\Http\Controllers\api\liff\ec_configuration\EcommerceConfigurationController as LiffEcommerceConfigurationController;
use App\Http\Controllers\api\liff\event\EventController as LiffEventController;
use App\Http\Controllers\api\liff\event\EventReservationController;
use App\Http\Controllers\api\liff\invite\InviteController;
use App\Http\Controllers\api\liff\GetLiffIdController;
use App\Http\Controllers\api\liff\invite\InviteeIncentiveController as LiffInviteeIncentiveUserController;
use App\Http\Controllers\api\liff\invite\InviteeUserController;
use App\Http\Controllers\api\liff\invite\InviteIncentiveJobController;
use App\Http\Controllers\api\liff\invite\InviterIncentiveController as LiffInviterIncentiveUserController;
use App\Http\Controllers\api\liff\order\OrderController as LiffOrderController;
use App\Http\Controllers\api\liff\order_destination\OrderDestinationController as LiffOrderDestinationController;
use App\Http\Controllers\api\liff\order_destination\SelectedOrderDestinationController;
use App\Http\Controllers\api\liff\order_destination\UpdateOrderDestinationController;
use App\Http\Controllers\api\liff\payjp\PayJpKeyController;
use App\Http\Controllers\api\liff\payment_method\PaymentMethodController;
use App\Http\Controllers\api\liff\privacy_policy\PrivacyPolicyController as LiffPrivacyPolicyController;
use App\Http\Controllers\api\liff\product\ProductCategoryController as LiffProductCategoryController;
use App\Http\Controllers\api\liff\product\ProductController as LiffProductController;
use App\Http\Controllers\api\liff\product\ProductImageController as LiffProductImageController;
use App\Http\Controllers\api\liff\product_reservation\ProductReservationController;
use App\Http\Controllers\api\liff\questionnaire\QuestionnaireAnswerController as LiffQuestionnaireAnswerController;
use App\Http\Controllers\api\liff\questionnaire\QuestionnaireController as LiffQuestionnaireController;
use App\Http\Controllers\api\liff\specific_trades\SpecificTradeController as LiffSpecificTradeController;
use App\Http\Controllers\api\liff\terms_of_service\TermsOfServiceController as LiffTermsOfServiceController;
use App\Http\Controllers\api\liff\user\UserController as LiffUserController;
use App\Http\Controllers\api\liff\postage\PostageController as LiffPostageController;
use App\Http\Controllers\api\liff\privileges\PrivilegeController as LiffPrivilegeController;
use App\Http\Controllers\api\liff\product\GetCategoriesController;
use App\Http\Controllers\api\liff\visitor\VisitorHistoryController as LiffVisitorHistoryController;
use App\Http\Controllers\api\liff\visitor_confirm\VisitorConfirmController;
use App\Http\Controllers\api\LineChannelAccessTokenController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\management\AdminController;
use App\Http\Controllers\api\management\ApiKeyController;
use App\Http\Controllers\api\management\BasicIdController;
use App\Http\Controllers\api\management\event\EventCalendarController;
use App\Http\Controllers\api\management\event\EventController;
use App\Http\Controllers\api\management\user\UserController;
use App\Http\Controllers\api\management\PrivacyPolicyController;
use App\Http\Controllers\api\management\privilege\PrivilegeController;
use App\Http\Controllers\api\management\privilege\PrivilegeItemController;
use App\Http\Controllers\api\management\category\ProductCategoryController;
use App\Http\Controllers\api\management\category\ProductCategorySortController;
use App\Http\Controllers\api\management\coupon\CouponController;
use App\Http\Controllers\api\management\coupon\CouponUserController;
use App\Http\Controllers\api\management\dashboard\DashboardController;
use App\Http\Controllers\api\management\DefaultSegmentController;
use App\Http\Controllers\api\management\EcommerceConfigurationController;
use App\Http\Controllers\api\management\event\EventUserController;
use App\Http\Controllers\api\management\GreetingMessageController;
use App\Http\Controllers\api\management\GreetingMessagesWithQuestionnaireController;
use App\Http\Controllers\api\management\InflowRouteController;
use App\Http\Controllers\api\management\InflowRouteUserController;
use App\Http\Controllers\api\management\invitation\InvitationController;
use App\Http\Controllers\api\management\invitation\InvitationUserController;
use App\Http\Controllers\api\management\invitation\InviteeIncentiveController;
use App\Http\Controllers\api\management\invitation\InviteeIncentiveUserController;
use App\Http\Controllers\api\management\invitation\InviteIncentiveController;
use App\Http\Controllers\api\management\invitation\InviteIncentiveUserController;
use App\Http\Controllers\api\management\invitation\InviterIncentiveController;
use App\Http\Controllers\api\management\invitation\InviterIncentiveUserController;
use App\Http\Controllers\api\management\TermsOfServiceController;
use App\Http\Controllers\api\management\SpecificTradeController;
use App\Http\Controllers\api\management\TagController;
use App\Http\Controllers\api\management\PostageController;
use App\Http\Controllers\api\management\PrefectureController;
use App\Http\Controllers\api\management\questionnaire\QuestionnaireController;
use App\Http\Controllers\api\management\questionnaire\QuestionnaireItemController;
use App\Http\Controllers\api\management\ReportController;
use App\Http\Controllers\api\management\user\UserDemographicController;
use App\Http\Controllers\api\management\MeController;
use App\Http\Controllers\api\management\message\MessageController;
use App\Http\Controllers\api\management\message\MessageItemController;
use App\Http\Controllers\api\management\OccupationController;
use App\Http\Controllers\api\management\order\OrderController;
use App\Http\Controllers\api\management\order\OrderDeliveryController;
use App\Http\Controllers\api\management\order\OrderProductController;
use App\Http\Controllers\api\management\order\OrderUserController;
use App\Http\Controllers\api\management\PageController;
use App\Http\Controllers\api\management\product\ProductController;
use App\Http\Controllers\api\management\product\ProductImageController;
use App\Http\Controllers\api\management\questionnaire\QuestionnaireEnablingController;
use App\Http\Controllers\api\management\questionnaire\QuestionnaireSortController;
use App\Http\Controllers\api\management\QuestionnaireAnswerController;
use App\Http\Controllers\api\management\RelatedProductController;
use App\Http\Controllers\api\management\ReserveHistoryController;
use App\Http\Controllers\api\management\RichMenuAiliasController;
use App\Http\Controllers\api\management\RichMenuAliasController;
use App\Http\Controllers\api\management\RichMenuAllDeleateController;
use App\Http\Controllers\api\management\RichMenuController;
use App\Http\Controllers\api\management\RichMenuImageController;
use App\Http\Controllers\api\management\RichMenuSetDefaultController;
use App\Http\Controllers\api\management\SegmentController;
use App\Http\Controllers\api\management\SegmentTemplateController;
use App\Http\Controllers\api\management\SendMessageController;
use App\Http\Controllers\api\management\SendMulticastMessage;
use App\Http\Controllers\api\management\TagUserController;
use App\Http\Controllers\api\management\user\UserInfoStatusController;
use App\Http\Controllers\api\management\UserTagController;
use App\Http\Controllers\api\management\UserInviteHistoryController;
use App\Http\Controllers\api\management\user\UserOrderHistoryController;
use App\Http\Controllers\api\management\user\UserVisitorCountController;
use App\Http\Controllers\api\management\user\UserPurchaseController;
use App\Http\Controllers\api\management\UserReserveHistoryController;
use App\Http\Controllers\api\management\user\UserVisitorHistoryController;
use App\Http\Controllers\api\management\visitor\VisitorHistoryController;
use App\Http\Controllers\api\management\visitor\VisitorHistoryUserController;
use App\Http\Controllers\api\payjp\CardController;
use App\Http\Controllers\api\payjp\CustomerController;
use App\Http\Controllers\api\paypay\PayPayClient;
use App\Http\Controllers\api\SearchZipcodeController;
use App\Http\Controllers\LineWebhookController;
use App\Http\Controllers\UserWithQuestionneireController;
use App\Models\QuestionnaireAnswer;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/v1/user', function (Request $request) {
    return $request->user();
});


Route::middleware('auth:sanctum')->group(function () {
    Route::group(['prefix' => 'v1/management'], function () {
        Route::get('me', MeController::class);
        Route::get('basic-id', BasicIdController::class);
        Route::apiResource('admins', AdminController::class);
        Route::apiResource('users', UserController::class);
        Route::apiResource('users/{user}/questionnaire', QuestionnaireAnswerController::class);
        Route::apiResource('users/{user}/user_tag', TagUserController::class);
        Route::get('users/{user}/visitor-histories', UserVisitorHistoryController::class);
        Route::get('users/{user}/visitor-histories/count', UserVisitorCountController::class);
        Route::get('users/{user}/invite-history', UserInviteHistoryController::class);
        Route::get('users/{user}/orders', UserOrderHistoryController::class);
        Route::get('users/{user}/reserve-history', UserReserveHistoryController::class);
        Route::get('users/{user}/purchase', UserPurchaseController::class);
        Route::get('user-info-statuses', [UserInfoStatusController::class, 'index']);
        Route::put('user-info-statuses', [UserInfoStatusController::class, 'update']);
        Route::get('demographic', UserDemographicController::class);
        Route::apiResource('privacy-policy', PrivacyPolicyController::class);
        Route::apiResource('terms-of-service', TermsOfServiceController::class);
        Route::get('specific-trades', [SpecificTradeController::class, 'index']);
        Route::post('specific-trades', [SpecificTradeController::class, 'store']);
        Route::apiResource('user_tags', UserTagController::class);
        Route::apiResource('postages', PostageController::class)->only([
            'index', 'store'
        ]);
        Route::put('postages', [PostageController::class, 'update']);
        Route::apiResource('privileges', PrivilegeController::class);
        Route::apiResource('privileges/{privilege}/items', PrivilegeItemController::class);
        Route::apiResource('events', EventController::class);
        Route::get('events/{event}/users', EventUserController::class);
        Route::apiResource('event-calendars', EventCalendarController::class);
        Route::apiResource('categories', ProductCategoryController::class);
        Route::put('categories/{category}/sort', ProductCategorySortController::class);
        Route::apiResource('questionnaires', QuestionnaireController::class);
        Route::apiResource('questionnaire-enabling', QuestionnaireEnablingController::class);
        Route::apiResource('questionnaires/{questionnaire}/items', QuestionnaireItemController::class, array("as" => "api"))->only([
            'store', 'update', 'destroy'
        ]);
        Route::put('questionnaires/{questionnaire}/sort', QuestionnaireSortController::class);
        Route::apiResource('products', ProductController::class);
        Route::apiResource('products/{product}/images', ProductImageController::class)->only([
            'index', 'store'
        ]);
        Route::put('products/{product}/images', [ProductImageController::class, 'update']);
        Route::delete('products/{product}/images', [ProductImageController::class, 'destroy']);
        Route::apiResource('products/{product}/related-product', RelatedProductController::class);
        Route::get('default-segments', DefaultSegmentController::class);
        Route::get('segments', SegmentController::class);
        Route::get('user-with-questionnaires', UserWithQuestionneireController::class);

        Route::group(['prefix' => 'report'], function () {
            Route::get('/users', [ReportController::class, 'getUserByDate']);
            Route::get('/user/analysis', [ReportController::class, 'getUserByMonth']);
            Route::get('/order/analysis', [ReportController::class, 'getTopSellingProductsFromLastMonth']);
        });
        Route::apiResource('coupons', CouponController::class);
        Route::get('coupons/{coupon}/users', CouponUserController::class);
        Route::apiResource('orders', OrderController::class);
        Route::get('orders/{order}/products', OrderProductController::class);
        Route::get('orders/{order}/user', OrderUserController::class);
        Route::apiResource('visitor-histories', VisitorHistoryController::class);
        Route::get('visitor-histories/{visitor_history}/user', VisitorHistoryUserController::class);
        Route::apiResource('reserve-histories', ReserveHistoryController::class);
        Route::apiResource('segment-template', SegmentTemplateController::class);
        Route::apiResource('invite-incentives', InviteIncentiveController::class);
        Route::get('invite-incentives/{invite_incentive}/inviter-users', InviterIncentiveController::class);
        Route::get('invite-incentives/{invite_incentive}/invitee-users', InviteeIncentiveController::class);
        Route::apiResource('messages', MessageController::class);
        Route::get('messages/{message}/items', [MessageItemController::class, 'index']);
        Route::delete('messages/{message}/items', [MessageItemController::class, 'destroy']);
        Route::apiResource('api-keys', ApiKeyController::class);
        Route::get('pages', [PageController::class, 'index']);
        Route::put('pages', [PageController::class, 'update']);
        Route::get('greeting-messages', [GreetingMessageController::class, 'index']);
        Route::post('greeting-messages', [GreetingMessageController::class, 'store']);
        Route::put('greeting-messages', [GreetingMessageController::class, 'update']);
        Route::delete('greeting-messages', [GreetingMessageController::class, 'destroy']);
        Route::apiResource('greeting-messages/questionnaires', GreetingMessagesWithQuestionnaireController::class);
        Route::get('access-token', LineChannelAccessTokenController::class);
        Route::apiResource('rich-menus', RichMenuController::class);
        Route::get('rich-menu-image/{id}', RichMenuImageController::class);
        Route::apiResource('rich-menu-ailias', RichMenuAliasController::class);
        Route::get('rich-menu-all-deleate', RichMenuAllDeleateController::class);
        Route::post('rich-menu-set-default/{id}', RichMenuSetDefaultController::class);
        Route::apiResource('ecommerce-configurations', EcommerceConfigurationController::class);
        Route::post('send-multicast-message', SendMulticastMessage::class);
        Route::apiResource('send-messages', SendMessageController::class);
        Route::apiResource('inflow-routes', InflowRouteController::class);
        Route::apiResource('reports', ReportController::class);
        Route::get('report-data', [DashboardController::class, 'getGraphData']);
    });
});


// LIFF側で叩くAPI
Route::group(['prefix' => 'v1'], function() {
    Route::middleware('auth.liff')->group(function() {

        Route::group(['prefix' => 'users/{user}'], function() {
            Route::apiResource('coupons', LiffCouponController::class);
            Route::apiResource('carts', CartController::class);
            Route::post('user-deliveryaddress-questionnaireanswers', LiffQuestionnaireAnswerController::class);
            Route::apiResource('destinations', LiffOrderDestinationController::class);
            Route::put('destinations', UpdateOrderDestinationController::class);
            Route::get('selected-destination', SelectedOrderDestinationController::class);
            Route::apiResource('payments', PaymentMethodController::class)->only([
                'index', 'store', 'update'
            ]);
            Route::get('customers/{customer_id}', [CustomerController::class, 'show']);
            Route::post('customers', [CustomerController::class, 'store']);
            Route::put('customers', [CustomerController::class, 'update']);
            Route::apiResource('cards', CardController::class);
            Route::apiResource('orders', LiffOrderController::class);
            Route::apiResource('product/reservations', ProductReservationController::class);
            Route::get('event/reservations', [EventReservationController::class, 'index']);
            Route::post('events/{event}/reservations', [EventReservationController::class, 'store']);
            Route::post('visitor-confirm/auth', [VisitorConfirmController::class, 'auth']);
            Route::post('visitor-confirm/create', [VisitorConfirmController::class, 'create']);
            Route::apiResource('inviter-incentives', LiffInviterIncentiveUserController::class);
            Route::apiResource('invitee-incentives', LiffInviteeIncentiveUserController::class);
            Route::apiResource('visitor-histories', LiffVisitorHistoryController::class);
            Route::get('invites', InviteController::class);
        });
    });
    Route::apiResource('users', LiffUserController::class);
    Route::apiResource('products', LiffProductController::class)->only([
        'index', 'show'
    ]);
    Route::get('products/{product}/images', [LiffProductImageController::class, 'index']);
    Route::get('products/{product}/category', LiffProductCategoryController::class);
    Route::get('user-info-statuses', [UserInfoStatusController::class, 'index']);
    Route::get('postages', LiffPostageController::class);
    Route::get('address', SearchZipcodeController::class);
    Route::get('prefectures', PrefectureController::class);
    Route::get('questionnaires', LiffQuestionnaireController::class);
    Route::apiResource('questionnaire-enabling', QuestionnaireEnablingController::class);
    Route::apiResource('occupations', OccupationController::class);
    Route::get('privacy-policy', LiffPrivacyPolicyController::class);
    Route::get('terms-of-service', LiffTermsOfServiceController::class);
    Route::get('specific-trades', LiffSpecificTradeController::class);
    Route::get('ecommerce-configurations', LiffEcommerceConfigurationController::class);
    Route::apiResource('inflow-route-users', InflowRouteUserController::class);
    Route::get('get-liff-id', GetLiffIdController::class);
    Route::get('payjp-public-key', PayJpKeyController::class);
    Route::apiResource('invite-incentive-job', InviteIncentiveJobController::class);
    Route::apiResource('events', LiffEventController::class);
    Route::get('privileges', LiffPrivilegeController::class);
    Route::get('product-categories', GetCategoriesController::class);
    Route::post('paypay-test', [PayPayClient::class, 'qr']);
});


Route::post('/line/webhook/urwhdwwrlx', LineWebhookController::class)->name('line.webhook');
