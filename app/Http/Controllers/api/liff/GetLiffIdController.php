<?php

namespace App\Http\Controllers\api\liff;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class GetLiffIdController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        return config('api_key')['MIX_LIFF_ID'];
    }
}
