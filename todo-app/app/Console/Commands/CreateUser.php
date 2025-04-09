<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class CreateUser extends Command
{
    protected $signature = 'create:user {name} {email} {password}';

public function handle()
{
    \App\Models\User::create([
        'name' => $this->argument('name'),
        'email' => $this->argument('email'),
        'password' => bcrypt($this->argument('password')),
    ]);
    
    $this->info('User created successfully!');
}
}
