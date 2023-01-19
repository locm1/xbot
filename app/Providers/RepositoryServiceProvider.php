<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\user\UserRepositoryInterface;
use App\Repositories\User\UserRepository;
use App\Services\user\UserService;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(UserService::class);
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
