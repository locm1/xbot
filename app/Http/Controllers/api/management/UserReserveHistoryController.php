<?php

namespace App\Http\Controllers\api\management;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserReserveHistoryController extends Controller
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
            'reserve_histories' => $user->reserveHistories()->with('product')->get()
        ];
    }
}
