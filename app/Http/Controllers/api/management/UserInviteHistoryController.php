<?php

namespace App\Http\Controllers\api\management;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

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
        $from_invited_users = $user->inviteeHistories()->with('inviterUsers')->get();
        return [
            'invite_histories' => $user->inviteHistories()->with('inviteeUsers')->get(),
            'from_invited_user' => (is_array($from_invited_users) && !empty($from_invited_users)) ? $from_invited_users : $from_invited_users,
        ];
    }
}
