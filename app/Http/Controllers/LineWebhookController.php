<?php

namespace App\Http\Controllers;

use App\Services\api\line\FollowService;
use App\Services\api\line\greeting\GreetingService;
use App\Services\api\line\invite\InviteService;
use App\Services\api\line\UnfollowService;
use Illuminate\Http\Request;
use App\Services\api\LineBotService as LINEBot;
use App\Services\management\invitation\InviteeIncentiveService;
use App\Services\liff\invite\InviteIncentiveJobService;
use LINE\LINEBot\HTTPClient\CurlHTTPClient;
use Illuminate\Support\Facades\Log;

class LineWebhookController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $data = $request->all();
        $events = $data['events'];

        $httpClient = new CurlHTTPClient(config('services.line.message.channel_token'));
        $bot = new LINEBot($httpClient, ['channelSecret' => config('services.line.message.channel_secret')]);
        Log::channel('line_webhook')->info(print_r($events, true));

        foreach ($events as $event) {
            if ($event['type'] === 'follow') {
                $follow_service = new FollowService($bot, $event['source']['userId']);
                $invite_service = new InviteService;
                $greeting_service = new GreetingService($bot, $event['source']['userId'], $event['replyToken']);
                //招待管理のために今回が新規作成か（既にDBに登録されていないか）確認
                $userExisted = $follow_service->userExists();
                //ユーザー作成
                $User = $follow_service->upsertUser();
                //流入経路
                $update_count = $follow_service->checkInflowRoute($User);
                //今回が新規登録だった場合、invite処理
                if (!$userExisted) $invite_service($User->line_id, 1);
                //挨拶文送信
                $greeting_service->sendGreetingMessage();
                
            } elseif ($event['type'] === 'unfollow') {
                $unfollow_service = new UnfollowService($bot, $event['source']['userId']);
                $unfollow_service->updateUser($event['timestamp']);
            }
            // $response = $bot->replyText($event['replyToken'], $event['message']['text']);
        }
        return;
    }
}
