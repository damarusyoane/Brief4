<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
{
    \App\Models\User::create([
        'name' => 'Admin User',
        'email' => 'admin@example.com',
        'password' => bcrypt('password123'), // Always bcrypt passwords!
        'email_verified_at' => now(),
    ]);
    
    // Add more users if needed
    \App\Models\User::factory(5)->create(); 
}
}
