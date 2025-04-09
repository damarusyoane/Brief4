<?php 
namespace App\Console;

use Illuminate\Foundation\Console\Kernel as ConsoleKernel;


class Kernel extends ConsoleKernel
{
    protected $commands = [
        \App\Console\Commands\CreateUserCommand::class,
        \App\Console\Commands\CreateUser::class,
        // Other commands...
    ];
}