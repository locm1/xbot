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
        # デフォルトに設定
        if ($request->is_default == 1) {
            DefaultInviteIncentive::where('id', 1)->update([
                'invite_incentive_id' => $invite_incentive->id
            ]);
        }

        $data = $request->only([
            'name', 'inviter_timing', 'inviter_format' , 'inviter_title' , 'inviter_content', 
            'invitee_timing' , 'invitee_format' , 'invitee_title' , 'invitee_content'
        ]);
        return $invite_incentive->update($data);
    }


    public function destroy(InviteIncentive $invite_incentive) 
    {
        $invite_incentive->delete();
    }

}
