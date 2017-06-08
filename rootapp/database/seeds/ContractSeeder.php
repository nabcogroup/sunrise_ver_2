<?php

use App\Tenant;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class ContractSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::table('tenants')->delete();
        DB::table('tenant_addresses')->delete();

        $tenant = Tenant::create([
            'created_at'    => Carbon::now(),
            'updated_at'    => Carbon::now(),
            'type'          => 'company',
            'code'          => 'CR123456',
            'full_name'     => 'Nabina',
            'email_address' => 'it@nabcogroup.co',
            'tel_no'        => '974 4466 6646',
            'fax_no'        => '974 4414 9430',
            'mobile_no'     => '',
            'reg_date'      =>  Carbon::now()->addYear(5),
            'reg_id'        =>  'CR0000001',
            'reg_name'      =>  'Rodrigo Rosario'
        ]);


        $tenantAddress = new \App\TenantAddress();
        $tenantAddress->address_1 = "Old Airport Al Wakrah";
        $tenantAddress->address_2 = "";
        $tenantAddress->city = "Doha";
        $tenantAddress->postal_code = "1654";

        $tenant->TenantAddress()->save($tenantAddress);

        $contract = new \App\Contract();
        $villa = \App\Villa::all()->first();
        $user = \App\User::all()->first();

        $contract->create([
            'created_at'    =>  new DateTime(),
            'updated_at'    =>  new DateTime(),
            'contract_no'   =>  "C".$villa->villa_no."-2017-1",
            'contract_type' =>  "legalized",
            'period_start'  =>  Carbon::now(),
            'period_end'    =>  Carbon::now()->addYear(1),
            'amount'        => "10400.00",
            'villa_id'      => $villa->id,
            'tenant_id'     => $tenant->id,
            'user_id'       => $user->id,
            'status'        => 'pending'
        ]);
    }
}
