<?php

namespace App\Console;

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
                $service = new SendMulticastMessageService;
                $jobs = SendMessageJob::where('reservation_datetime', '<=', now())->with('sendMessageJobUser')->get();
                foreach ($jobs as $k => $job) {
                    Log::info($service->send($job->message_id, $job->sendMessageJobUser->pluck('line_id')->all())->getJSONDecodedBody());
                    SendMessageJob::find($job->id)->delete();
                }
            } else {
                Log::debug('no jobs');
            }
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
