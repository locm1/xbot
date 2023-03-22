<?php

namespace App\Http\Controllers\api\liff\privacy_policy;

use App\Http\Controllers\Controller;
use App\Services\setting\PrivacyPolicyService;
use Illuminate\Http\Request;

class PrivacyPolicyController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(PrivacyPolicyService $privacy_policy_service)
    {
        $privacy_policy = $privacy_policy_service->getPrivacyPolicyById();
        return response()->json(['privacy_policy' => $privacy_policy], 200);
    }
}
