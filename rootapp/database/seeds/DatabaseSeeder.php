<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
//        $this->call('SelectionSeeder');
//        $this->call('VillaSeeder');
        //$this->call('UserSeeder');
        $this->call('ContractSeeder');

        $this->command->info('Seed Successfully completed');
    }
}
