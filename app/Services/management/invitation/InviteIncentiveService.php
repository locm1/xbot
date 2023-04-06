<?php

namespace App\Services\management\invitation;

use App\Models\DefaultInviteIncentive;
use App\Models\Invitation;
use App\Models\InviteIncentive;
use App\Services\management\AbstractManagementService;

class InviteIncentiveService
{

    public function index() 
    {
        $invite_incentives = InviteIncentive::all();
        $default_invite_incentive = DefaultInviteIncentive::find(1);
        return [
            'invite_incentives' => $invite_incentives,
            'default_invite_incentive' => $default_invite_incentive
        ];
    }


    public function store() 
    {
        //
    }


    public function show(InviteIncentive $invite_incentive) 
    {
        return $invite_incentive;
    }


    public function update($request, InviteIncentive $invite_incentive) 
    {
        $data = $request->only(['coupon_id', 'privilege_detail']);
        return $invite_incentive->update($data);
    }


    public function destroy(InviteIncentive $invite_incentive) 
    {
        $invite_incentive->delete();
    }

}
