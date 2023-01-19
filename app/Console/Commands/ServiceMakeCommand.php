<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class ServiceMakeCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:service {serviceClassName} {serviceDir}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new Service Class';

    public const SERVICES_PATH = 'app/Services/';

    /**
     * @var string
     */
    private $className;
    private $serviceDir;

    /**
     * @var string
     */
    private $serviceFileName;

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->className = $this->argument('serviceClassName');
        $this->serviceDir = $this->argument('serviceDir');
        $this->serviceFileName = self::SERVICES_PATH .$this->serviceDir .'/' .$this->className .'.php';
        $this->createServiceFile($this->serviceDir);
        $this->info('Service created successfully.');
    }

    /**
     * Create Service File.
     */
    private function createServiceFile($serviceDir): void
    {
        $content = "<?php\n\nnamespace App\\Services\\$serviceDir;\n\n\nclass {$this->className} \n{\n    //\n}\n";

        file_put_contents($this->serviceFileName, $content);
    }
}
