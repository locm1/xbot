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
                $invite_incentive_job_service = new InviteIncentiveJobService;
                $invitee_incentive_service = new InviteeIncentiveService;
                //ユーザー作成
                $User = $follow_service->createUser();
                //流入経路
                $update_count = $follow_service->checkInflowRoute($User);
                //招待管理
                $InviteIncentiveJob = $invite_incentive_job_service->searchByLineId($User->line_id);
                if ($InviteIncentiveJob) $InviteIncentiveJob->update(['invitee_user_id' => $User->id]);
                //招待クーポン発行

                $greeting_service = new GreetingService($bot, $event['source']['userId'], $event['replyToken']);
                // $invite_service = new InviteService($bot, $User);
                return $greeting_service->sendGreetingMessage();
                // return $invite_service->sendInviteMessage($invitee_incentive_user->is_issued, 'invitee', 1);
                
            } elseif ($event['type'] === 'unfollow') {
                $unfollow_service = new UnfollowService($bot, $event['source']['userId']);
                return $unfollow_service->updateUser($event['timestamp']);
            }
            $response = $bot->replyText($event['replyToken'], $event['message']['text']);
        }
        return;
    }
}
