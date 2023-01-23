<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\PrivacyPolicyController;
use App\Http\Controllers\api\TermsOfServiceController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/setting/privacy-policy', [PrivacyPolicyController::class, 'index']);
Route::post('/setting/privacy-policy/store', [PrivacyPolicyController::class, 'store']);
Route::post('/setting/privacy-policy/update', [PrivacyPolicyController::class, 'update']);

Route::get('/setting/terms-of-service', [TermsOfServiceController::class, 'index']);
Route::post('/setting/terms-of-service/store', [TermsOfServiceController::class, 'store']);
Route::post('/setting/terms-of-service/update', [TermsOfServiceController::class, 'update']);