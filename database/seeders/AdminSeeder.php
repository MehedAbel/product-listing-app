<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (!User::where('email', 'admin@practica.roweb')->exists()) {
            $user = new User();
            $user->name = 'Admin';
            $user->email = 'admin@practica.roweb';
            $user->password = Hash::make('parola');
            $user->save();
        }

        if (!User::where('email', 'andrew@practica.roweb')->exists()) {
            $user = new User();
            $user->name = 'Andrew';
            $user->email = 'andrew@practica.roweb';
            $user->password = Hash::make('parola');
            $user->save();
        }
    }
}
