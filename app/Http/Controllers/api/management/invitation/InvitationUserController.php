<?php

namespace App\Http\Controllers\api\management\invitation;

use App\Http\Controllers\Controller;
use App\Models\Invitation;
use App\Services\management\invitation\InvitationUserService;
use Illuminate\Http\Request;

class InvitationUserController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(InvitationUserService $invitation_user_service, Invitation $invitation)
    {
        $invitation_users = $invitation_user_service->getInvitationUsersById($invitation);
        return response()->json(['invitation_users' => $invitation_users], 200);
    }
}
