<?php

namespace App\Console;

use App\Models\SendMessage;
use App\Models\SendMessageJob;
use App\Services\management\send_multicast_message\SendMulticastMessageService;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\Log;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        
        $schedule->call(function () {
            if (SendMessageJob::exists()) {
                $send_message_ids = array();
                $send_message_job_ids = array();

                $service = new SendMulticastMessageService;
                $jobs = SendMessageJob::where('reservation_at', '<=', now())->with('sendMessage.sendMessageUsers.user')->get();
                foreach ($jobs as $k => $job) {
                    Log::info($service->send($job->sendMessage->message_id, $job->sendMessage->sendMessageUsers->pluck('user.line_id')->all())->getJSONDecodedBody());
                    $send_message_ids[] = $job->send_message_id;
                    $send_message_job_ids[] = $job->id;
                }

                //ステータスの更新
                SendMessage::whereIn('id', $send_message_ids)->update(['status' => 0]);

                //ジョブの削除
                SendMessageJob::whereIn('id', $send_message_job_ids)->delete();
            } 
            // else {
            //     Log::debug('no jobs');
            // }
        })->everyMinute();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
