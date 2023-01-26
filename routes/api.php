<?php

use App\Http\Controllers\api\admin\UserController;
use App\Http\Controllers\api\admin\PrivacyPolicyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\TermsOfServiceController;
use App\Http\Controllers\api\auth\LoginController;
use App\Http\Controllers\api\auth\LogoutController;

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

Route::group(['prefix' => 'v1'], function() {
    Route::resource('users', UserController::class);
    Route::resource('privacy-policy', PrivacyPolicyController::class);
    Route::resource('terms-of-service', TermsOfServiceController::class);
});