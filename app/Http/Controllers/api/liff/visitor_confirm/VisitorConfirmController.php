<?php

namespace App\Http\Controllers\api\liff\visitor_confirm;

use App\Http\Controllers\Controller;
use App\Models\VisitorHistory;
use App\Services\liff\visitor\VisitorHistoryService;
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
            $visitor_history_service = new VisitorHistoryService;
            return $visitor_history_service->store((int) $request->user_id);
        }
        return abort(400, '認証失敗');
    }
}
