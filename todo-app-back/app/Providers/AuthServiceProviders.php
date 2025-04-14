<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AuthServiceProviders extends ServiceProvider
{
    protected $policies = [
        Task::class => TaskPolicy::class,
    ];
}