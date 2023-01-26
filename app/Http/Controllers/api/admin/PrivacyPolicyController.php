<?php

namespace App\Http\Controllers\api\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PrivacyPolicy;
use App\Http\Requests\admin\setting\CreatePrivacyPolicyRequest;
use App\Http\Requests\admin\setting\UpdatePrivacyPolicyRequest;
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
        $policy = $this->privacy_policy_service->getAllPrivacyPolicies();
        return response()->json(['policy' => $policy], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreatePrivacyPolicyRequest $request)
    {
        $policy = $this->privacy_policy_service->createPrivacyPolicy($request->content);
        return response()->json(['policy' => $policy], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePrivacyPolicyRequest $request, PrivacyPolicy $policy)
    {
        $res = $this->privacy_policy_service->updatePrivacyPolicy($policy, $request->content ?? "");
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
