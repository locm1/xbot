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
    private $serviceDirName;

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
        $this->serviceDirName = $this->argument('serviceDir');
        $serviceDir = self::SERVICES_PATH .$this->serviceDirName;
        $this->serviceFileName = $serviceDir .'/' .$this->className .'Service.php';
        
        if (!file_exists($serviceDir)) {
            $this->createDir($serviceDir);
        }
        
        $this->createServiceFile($this->serviceDirName);
        $this->info('Service created successfully.');
    }

    /**
     * Create Service File.
     */
    private function createServiceFile($serviceDir): void
    {
        $index_function = "public function index() \n    {\n        //\n    }\n";
        $create_function = "public function store() \n    {\n        //\n    }\n";
        $show_function = "public function show() \n    {\n        //\n    }\n";
        $update_function = "public function update() \n    {\n        //\n    }\n";
        $delete_function = "public function destroy() \n    {\n        //\n    }\n";
        $content = "<?php\n\nnamespace App\\Services\\$serviceDir;\n\nuse App\Services\management\AbstractManagementService;\n\nclass {$this->className}Service extends AbstractManagementService \n{\n\n    $index_function\n\n    $create_function\n\n    $show_function\n\n    $update_function\n\n    $delete_function\n}\n";

        file_put_contents($this->serviceFileName, $content);
    }

    /**
     * Create Service File.
     */

    private function createDir($serviceDir)
    {
        mkdir("$serviceDir", 0775);
    }
}
