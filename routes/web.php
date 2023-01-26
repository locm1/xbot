<?php

use App\Http\Controllers\api\auth\LoginController;
use App\Http\Controllers\api\auth\LogoutController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::post('/api/v1/login', LoginController::class)->name('login');
Route::post('/api/v1/logout', LogoutController::class)->name('logout');

Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');