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
    public function __invoke(User $user)
    {
        $bot = new CreateLineBotUtility;
        $invite_service = new InviteService($bot(), $user);
        $messages = $invite_service->createTextMessage();
        return response()->json(['messages' => $messages], 200);
    }
}
