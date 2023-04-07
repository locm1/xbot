<?php

namespace App\Http\Controllers\api\management\invitation;

use App\Http\Controllers\Controller;
use App\Http\Requests\management\invitation\StoreInviteIncentiveRequest;
use App\Services\management\invitation\InviteIncentiveService;
use App\Http\Requests\management\invitation\UpdateInviteIncentiveRequest;
use App\Models\InviteIncentive;

class InviteIncentiveController extends Controller
{

    private $invite_incentive_service;

    public function __construct(InviteIncentiveService $invite_incentive_service) {
        $this->invite_incentive_service = $invite_incentive_service;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $invite_incentives = $this->invite_incentive_service->index();
        return response()->json(['invite_incentives' => $invite_incentives], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreInviteIncentiveRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreInviteIncentiveRequest $request)
    {
        $invitation = $this->invite_incentive_service->store($request);
        return response()->json(['invite_incentive' => $invitation], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  InviteIncentive  $invite_incentive
     * @return \Illuminate\Http\Response
     */
    public function show(InviteIncentive $invite_incentive)
    {
        $invitation = $this->invite_incentive_service->show($invite_incentive);
        return response()->json(['invite_incentive' => $invitation], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateInviteIncentiveRequest  $request
     * @param  InviteIncentive  $invite_incentive
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateInviteIncentiveRequest $request, InviteIncentive $invite_incentive)
    {
        $invitation = $this->invite_incentive_service->update($request, $invite_incentive);
        return response()->json(['invite_incentive' => $invitation], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(InviteIncentive $invite_incentive)
    {
        $this->invite_incentive_service->destroy($invite_incentive);
        return response()->json([], 204);
    }
}
