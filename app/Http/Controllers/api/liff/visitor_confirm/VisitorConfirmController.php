<?php

namespace App\Http\Controllers\api\liff\visitor_confirm;

use App\Http\Controllers\Controller;
use App\Models\VisitorHistory;
use Illuminate\Http\Request;

class VisitorConfirmController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        if ($request->password === config('api_key')['COMMON_PASSWORD']) {
            return VisitorHistory::create(['user_id' => $request->user_id]);
        }
        return abort(401, '認証失敗');
    }
}
