<?php

use App\Http\Controllers\api\management\admin\AdminController;
use App\Http\Controllers\api\management\user\UserController;
use App\Http\Controllers\api\management\privacy_policy\PrivacyPolicyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\management\terms_of_service\TermsOfServiceController;
use App\Http\Controllers\api\management\specific_trade\SpecificTradeController;
use App\Http\Controllers\api\management\specific_trade\SpecificTradeIndexController;

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
    Route::group(['prefix' => 'v1'], function() {
        Route::apiResource('admins', AdminController::class);
        Route::apiResource('users', UserController::class);
        Route::apiResource('privacy-policy', PrivacyPolicyController::class);
        Route::apiResource('terms-of-service', TermsOfServiceController::class);
        Route::apiResource('specific-trades', SpecificTradeController::class)->only([
            'store', 'show', 'update', 'destroy'
        ]);;
    });
});


// LIFF側で叩くAPI（認証なしでもできる）
Route::group(['prefix' => 'v1'], function() {
    Route::get('/specific-trades', SpecificTradeIndexController::class);
});