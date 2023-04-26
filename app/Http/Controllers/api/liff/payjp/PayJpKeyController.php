<?php

namespace App\Http\Controllers\api\liff\payjp;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PayJpKeyController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * 
     * @return \Illuminate\Http\Response
     */
    public function __invoke()
    {
        return response()->json(['payjp_public_key' => config('api_key')['MIX_PAYJP_PUBLIC_KEY']], 200);
    }
}
