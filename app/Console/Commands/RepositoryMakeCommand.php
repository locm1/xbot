<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class RepositoryMakeCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:repository {repositoryClassName} {repositoryDir}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new Repository Class';

    public const REPOSITORY_PATH = 'app/Repositories/';

    /**
     * @var string
     */
    private $className;
    private $repositoryDir;

    /**
     * @var string
     */
    private $repositoryFileName;
    private $interfaceFileName;

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->className = $this->argument('repositoryClassName');
        $this->repositoryDir = $this->argument('repositoryDir');
        $this->repositoryFileName = self::REPOSITORY_PATH .$this->repositoryDir .'/' .$this->className .'.php';
        $this->interfaceFileName = self::REPOSITORY_PATH .$this->repositoryDir .'/' .$this->className .'Interface.php';
        $this->createInterfaceFile($this->repositoryDir);
        $this->createRepositoryFile($this->repositoryDir);
        $this->info('Repository created successfully.');
    }

    /**
     * Create Repository File.
     */
    private function createRepositoryFile($repositoryDir): void
    {
        $content = "<?php\n\nnamespace App\\Repositories\\$repositoryDir;\n\n\nclass {$this->className} implements {$this->className}Interface \n{\n    //\n}\n";

        file_put_contents($this->repositoryFileName, $content);
    }

    /**
     * Create Interface File.
     */
    private function createInterfaceFile($repositoryDir): void
    {
        $content = "<?php\n\nnamespace App\\Repositories\\$repositoryDir;\n\n\ninterface {$this->className}Interface \n{\n    //\n}\n";

        file_put_contents($this->interfaceFileName, $content);
    }
}
