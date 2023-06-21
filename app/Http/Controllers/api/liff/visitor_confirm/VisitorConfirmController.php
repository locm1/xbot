<?php

namespace App\Http\Controllers\api\liff\visitor_confirm;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\VisitorHistory;
use App\Services\liff\user\UserService;
use App\Services\liff\visitor\VisitorHistoryService;
use Illuminate\Http\Request;

class VisitorConfirmController extends Controller
{
    private $service;

    public function __construct(VisitorHistoryService $service)
    {
        $this->service = $service;
    }
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function auth(Request $request, User $user)
    {
        if ($request->password === config('api_key')['COMMON_PASSWORD']) {
            return ['user' => $user];
        }
        return abort(400, '認証失敗');
    }

    public function create(Request $request, User $user)
    {
        if ($request->password === config('api_key')['COMMON_PASSWORD']) {
            return $this->service->store((int) $user->id);
        }
        return abort(400, '認証失敗');
    }

    public function check(User $user)
    {
        $check_result = $this->service->checkIfVisitedToday((int) $user->id);
        return response()->json(['result' => $check_result], 200);
    }
}
