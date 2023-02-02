<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class ControllerServiceMakeCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:all {ClassName} {targetDir}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new Service Class and Create Controller Class';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $className = $this->argument('ClassName');
        $dirName = $this->argument('targetDir');
        Artisan::call("make:controller api/management/{$className}Controller --api");
        Artisan::call("make:request management/{$dirName}/Store{$className}Request");
        Artisan::call("make:request management/{$dirName}/Update{$className}Request");
        Artisan::call("make:model {$className}");
        Artisan::call("make:service {$className} {$dirName}");
        $this->info('all created successfully.');
    }
}
