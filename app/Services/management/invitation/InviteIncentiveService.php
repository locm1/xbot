<?php

namespace App\Services\management\invitation;

use App\Models\DefaultInviteIncentive;
use App\Models\Invitation;
use App\Models\InviteIncentive;
use App\Services\common\CreateRandomStringUtility;
use App\Services\management\AbstractManagementService;
use Illuminate\Support\Facades\DB;

class InviteIncentiveService
{
    private $invite_incentive_action;

    public function __construct(CreateInviteIncentiveAction $invite_incentive_action)
    {
        $this->invite_incentive_action = $invite_incentive_action;
    }

    public function index() 
    {
        $invite_incentives = InviteIncentive::all();
        $default_invite_incentive = DefaultInviteIncentive::find(1);
        return [
            'invite_incentives' => $invite_incentives,
            'default_invite_incentive' => $default_invite_incentive
        ];
    }


    public function store($request) 
    {
        $data = $request->only([
            'name', 'inviter_timing', 'inviter_format' , 'inviter_title' , 'inviter_content', 
            'invitee_timing' , 'invitee_format' , 'invitee_title' , 'invitee_content'
        ]);
        
        # ランダム文字列が既に保存されているか
        $version_key = CreateRandomStringUtility::createRandomString(15);
        if (InviteIncentive::where('version_key', $version_key)->exists()) {
            $version_key = CreateRandomStringUtility::createRandomString(15);
        }

        $invite_incentive = $this->invite_incentive_action->createInviteIncentive($request, $data, $version_key);
        return $invite_incentive;
    }


    public function show(InviteIncentive $invite_incentive) 
    {
        return $invite_incentive;
    }


    public function update($request, InviteIncentive $invite_incentive) 
    {
        $data = $request->only([
            'name', 'inviter_timing', 'inviter_format' , 'inviter_title' , 'inviter_content', 
            'invitee_timing' , 'invitee_format' , 'invitee_title' , 'invitee_content'
        ]);
        $invite_incentive = $this->invite_incentive_action->createInviteIncentive($request, $data, $invite_incentive->version_key);
        return $invite_incentive;
    }


    public function destroy(InviteIncentive $invite_incentive) 
    {
        $invite_incentive->delete();
    }

}
