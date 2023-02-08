<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\management\AdminController;
use App\Http\Controllers\api\management\EventCalendarController;
use App\Http\Controllers\api\management\EventController;
use App\Http\Controllers\api\management\user\UserController;
use App\Http\Controllers\api\management\PrivacyPolicyController;
use App\Http\Controllers\api\management\privilege\PrivilegeController;
use App\Http\Controllers\api\management\privilege\PrivilegeItemController;
use App\Http\Controllers\api\management\category\ProductCategoryController;
use App\Http\Controllers\api\management\category\ProductCategorySortController;
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
use App\Http\Controllers\api\management\ProductController;
use App\Http\Controllers\api\management\questionnaire\QuestionnaireSortController;

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
    Route::group(['prefix' => 'v1/management'], function() {
        Route::get('me', MeController::class);
        Route::apiResource('admins', AdminController::class);
        Route::apiResource('users', UserController::class);
        Route::get('demographic', UserDemographicController::class);
        Route::apiResource('privacy-policy', PrivacyPolicyController::class);
        Route::apiResource('terms-of-service', TermsOfServiceController::class);
        Route::apiResource('specific-trades', SpecificTradeController::class);
        Route::apiResource('tags', TagController::class);
        Route::apiResource('postages', PostageController::class)->only([
            'index', 'store'
        ]);
        Route::put('postages', [PostageController::class, 'update']);
        Route::apiResource('privileges', PrivilegeController::class);
        Route::apiResource('privileges/{privilege}/items', PrivilegeItemController::class);
        Route::apiResource('events', EventController::class);
        Route::apiResource('event-calendars', EventCalendarController::class);
        Route::apiResource('categories', ProductCategoryController::class);
        Route::put('categories/{category}/sort', ProductCategorySortController::class);
        Route::get('prefectures', PrefectureController::class);
        Route::apiResource('questionnaires', QuestionnaireController::class);
        Route::apiResource('questionnaires/{questionnaire}/items', QuestionnaireItemController::class, array("as" => "api"))->only([
            'store', 'update', 'delete'
        ]);
        Route::put('questionnaires/{questionnaire}/sort', QuestionnaireSortController::class);
        Route::apiResource('products', ProductController::class);

        Route::group(['prefix' => 'report'], function() {
            Route::get('/users', [ReportController::class, 'getUserByDate']);
            Route::get('/user/analysis', [ReportController::class, 'getUserByMonth']);
        });
    });
});


// LIFF側で叩くAPI
Route::group(['prefix' => 'v1'], function() {
    // Route::get('/specific-trades', SpecificTradeIndexController::class);
});