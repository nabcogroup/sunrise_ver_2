<?php

use App\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

//        $store =
//            [
//                ['name' => 'Admin','policy_keys' => 'admin'],
//                ['name' => 'User1','policy_keys' => 'user1'],
//                ['name' => 'User2','policy_keys' => 'user2']
//            ];
//
//        //create roles
//        foreach($store as $storeRole) {
//            $role = new \App\Role();
//            $role->name = $storeRole['name'];
//            $role->description = $storeRole["policy_keys"];
//            $role->save();
//        }

        $user = User::create([
            'full_name' => 'Admin',
            'username'  =>  'admin',
            'email'     =>  'admin@gmail.com',
            'password'  =>  bcrypt('password')
        ]);

    }
}
