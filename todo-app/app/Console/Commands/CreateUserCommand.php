<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class CreateUserCommand extends Command
{
    protected $signature = 'user:create';
    protected $description = 'Create a new user';
    public function handle()
    {
        $user = \App\Models\User::create([
        'name' => 'API User',
        'email' => 'api@example.com',
        'password' => bcrypt('password')
    ]);
    
    $this->info("Utilisateur créé avec ID: ".$user->id);
    }
  
}
