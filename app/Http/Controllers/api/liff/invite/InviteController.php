<?php

namespace App\Http\Controllers\api\liff\invite;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\api\line\invite\InviteService;
use App\Services\api\LineBotService as LINEBot;
use App\Services\common\CreateLineBotUtility;
use LINE\LINEBot\HTTPClient\CurlHTTPClient;

class InviteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function __invoke(User $User)
    {
        $service = new InviteService();
        $uri = $service->getUri($User);
        $message = $service->getMessage($User->line_id, $uri);
        return response()->json([
            'message' => $message,
            'link' => $uri
        ], 200);
    }
}
