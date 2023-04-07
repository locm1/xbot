<?php

namespace App\Services\management\invitation;

use App\Models\DefaultInviteIncentive;
use App\Models\Invitation;
use App\Models\InviteIncentive;
use App\Services\common\CreateRandomStringUtility;
use App\Services\management\AbstractManagementService;
use Illuminate\Support\Facades\DB;

class CreateInviteIncentiveAction
{
    public function createInviteIncentive($request, $data, $version_key) 
    {
        return DB::transaction(function () use ($data, $version_key, $request) {
            $invite_incentive = InviteIncentive::create(array_merge($data, ['version_key' => $version_key]));

            # デフォルトに設定
            if ($request->is_default == 1) {
                DefaultInviteIncentive::where('id', 1)->update([
                    'invite_incentive_id' => $invite_incentive->id
                ]);
            }
            return $invite_incentive;
        });
    }
}
