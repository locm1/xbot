<?php

use App\Http\Controllers\api\management\AdminController;
use App\Http\Controllers\api\management\CategoryItemController;
use App\Http\Controllers\api\management\EventCalendarController;
use App\Http\Controllers\api\management\EventController;
use App\Http\Controllers\api\management\UserController;
use App\Http\Controllers\api\management\PrivacyPolicyController;
use App\Http\Controllers\api\management\privilege\PrivilegeController;
use App\Http\Controllers\api\management\privilege\PrivilegeItemController;
use App\Http\Controllers\api\management\ProductCategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\management\TermsOfServiceController;
use App\Http\Controllers\api\management\SpecificTradeController;
use App\Http\Controllers\api\management\TagController;
use App\Http\Controllers\api\management\PostageController;
use App\Http\Controllers\api\management\ReportController;

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
        Route::apiResource('admins', AdminController::class);
        Route::apiResource('users', UserController::class);
        Route::apiResource('privacy-policy', PrivacyPolicyController::class);
        Route::apiResource('terms-of-service', TermsOfServiceController::class);
        Route::apiResource('specific-trades', SpecificTradeController::class);
        Route::apiResource('tags', TagController::class);
        Route::apiResource('postages', PostageController::class);
        Route::apiResource('privileges', PrivilegeController::class);
        Route::apiResource('privileges/{privilege}/items', PrivilegeItemController::class);
        Route::apiResource('events', EventController::class);
        Route::apiResource('event-calendars', EventCalendarController::class);
        Route::apiResource('categories', ProductCategoryController::class);
        Route::apiResource('categories/{category}/products', CategoryItemController::class);

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