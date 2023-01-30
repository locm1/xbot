<?php

use App\Http\Controllers\api\management\AdminController;
use App\Http\Controllers\api\management\UserController;
use App\Http\Controllers\api\management\PrivacyPolicyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\management\TermsOfServiceController;
use App\Http\Controllers\api\management\SpecificTradeController;

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
    });
});


// LIFF側で叩くAPI
Route::group(['prefix' => 'v1'], function() {
    // Route::get('/specific-trades', SpecificTradeIndexController::class);
});