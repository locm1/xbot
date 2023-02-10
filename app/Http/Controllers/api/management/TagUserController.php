<?php

namespace App\Http\Controllers\api\management;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class TagUserController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(User $user)
    {
        return ['user_tags' => $user->userTags()->get()];
    }
}
