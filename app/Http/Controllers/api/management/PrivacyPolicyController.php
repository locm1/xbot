<?php

namespace App\Http\Controllers\api\management;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PrivacyPolicy;
use App\Http\Requests\management\privacy_policy\UpdatePrivacyPolicyRequest;
use App\Services\setting\PrivacyPolicyService;

class PrivacyPolicyController extends Controller
{
    private $privacy_policy_service;

    public function __construct(PrivacyPolicyService $privacy_policy_service) {
        $this->privacy_policy_service = $privacy_policy_service;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $privacy_policy = $this->privacy_policy_service->getPrivacyPolicyById();
        return response()->json(['privacy_policy' => $privacy_policy], 200);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePrivacyPolicyRequest $request, PrivacyPolicy $privacy_policy)
    {
        $res = $this->privacy_policy_service->updatePrivacyPolicy($privacy_policy, $request->content);
        return response()->json(['policy' => $res], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
