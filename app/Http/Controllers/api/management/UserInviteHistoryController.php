<?php

namespace App\Http\Controllers\api\management;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserInviteHistoryController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(User $user)
    {
        return [
            'invite_histories' => $user->inviteHistories()->with('inviteeUsers')->get(),
            'from_invited_user' => $user->inviteeHistories()->with('inviterUsers')->get()[0],
        ];
    }
}
