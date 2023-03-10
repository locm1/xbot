<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

class LineChannelAccessTokenController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke()
    {
        $access_token = config('api_key.LINE_MESSAGE_CHANNEL_TOKEN');
        return response()->json(['access_token' => $access_token], 200);
    }
}
