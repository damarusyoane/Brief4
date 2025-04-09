<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;

class GenerateToken extends Command
{
    protected $signature = 'generate:token {email}';

    public function handle()
    {
        $user = User::where('email', $this->argument('email'))->firstOrFail();
        $this->info($user->createToken('command-token')->plainTextToken);
    }
}
