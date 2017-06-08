<?php

use Illuminate\Database\Seeder;

class SelectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        /******************
         * Villa Type
         ********************/
        DB::table('selections')->delete();


        //villa class--------------------
        DB::table('selections')->insert([
            'created_at'    =>  new DateTime(),
            'updated_at'    =>  new DateTime(),
            'code'          =>  "fully_furnished",
            'name'          =>  "Fully Furnished",
            'category'      =>  "villa_type",
            'parent'        =>  0
        ]);

        DB::table('selections')->insert([
            'created_at'    =>  new DateTime(),
            'updated_at'    =>  new DateTime(),
            'code'          =>  "semi_furnished",
            'name'          =>  "Semi Furnished",
            'category'      =>  "villa_type",
            'parent'        =>  0
        ]);

        DB::table('selections')->insert([
            'created_at'    =>  new DateTime(),
            'updated_at'    =>  new DateTime(),
            'code'          =>  "unfurnished",
            'name'          =>  "UnFurnished",
            'category'      =>  "villa_type",
            'parent'        =>  0
        ]);

        $this->command->info('Villa Class Successfully completed');

        //villa status ------------------------------------------
        DB::table('selections')->insert([
            'created_at'    =>  new DateTime(),
            'updated_at'    =>  new DateTime(),
            'code'          =>  "vacant",
            'name'          =>  "Vacant",
            'category'      =>  "villa_status",
            'parent'        =>  0
        ]);
        DB::table('selections')->insert([
            'created_at'    =>  new DateTime(),
            'updated_at'    =>  new DateTime(),
            'code'          =>  "occupied",
            'name'          =>  "Occupied",
            'category'      =>  "villa_status",
            'parent'        =>  0
        ]);
        DB::table('selections')->insert([
            'created_at'    =>  new DateTime(),
            'updated_at'    =>  new DateTime(),
            'code'          =>  "reserved",
            'name'          =>  "Reserved",
            'category'      =>  "villa_status",
            'parent'        =>  0
        ]);

        $this->command->info('Villa Status Successfully completed');


        //payment mode---------------------------------
        DB::table('selections')->insert([
            'created_at'    =>  new DateTime(),
            'updated_at'    =>  new DateTime(),
            'code'          =>  "payment",
            'name'          =>  "Payment",
            'category'      =>  "payment_mode",
            'parent'        =>  0
        ]);

        DB::table('selections')->insert([
            'created_at'    =>  new DateTime(),
            'updated_at'    =>  new DateTime(),
            'code'          =>  "security_deposit",
            'name'          =>  "Security Deposit",
            'category'      =>  "payment_mode",
            'parent'        =>  0
        ]);

        $this->command->info('Payment Mode Successfully completed');

        //payment status--------------------------------
        DB::table('selections')->insert([
            'created_at'    =>  new DateTime(),
            'updated_at'    =>  new DateTime(),
            'code'          =>  "clear",
            'name'          =>  "Clear",
            'category'      =>  "payment_status",
            'parent'        =>  0
        ]);
    
        DB::table('selections')->insert([
            'created_at'    =>  new DateTime(),
            'updated_at'    =>  new DateTime(),
            'code'          =>  "received",
            'name'          =>  "Received",
            'category'      =>  "payment_status",
            'parent'        =>  0
        ]);

        DB::table('selections')->insert([
            'created_at'    =>  new DateTime(),
            'updated_at'    =>  new DateTime(),
            'code'          =>  "cancelled",
            'name'          =>  "Cancelled",
            'category'      =>  "payment_status",
            'parent'        =>  0
        ]);

        $this->command->info('Payment Status Successfully completed');

        //payment term ---------------------------------
        DB::table('selections')->insert([
            'created_at'    =>  new DateTime(),
            'updated_at'    =>  new DateTime(),
            'code'          =>  "cash",
            'name'          =>  "Cash",
            'category'      =>  "payment_term",
            'parent'        =>  0
        ]);

        DB::table('selections')->insert([
            'created_at'    =>  new DateTime(),
            'updated_at'    =>  new DateTime(),
            'code'          =>  "cheque",
            'name'          =>  "Cheque",
            'category'      =>  "payment_term",
            'parent'        =>  0
        ]);

        $this->command->info('Payment Term Successfully completed');

        //contract status-----------------------------
         DB::table('selections')->insert([
            'created_at'    =>  new DateTime(),
            'updated_at'    =>  new DateTime(),
            'code'          =>  "pending",
            'name'          =>  "Pending",
            'category'      =>  "contract_status",
            'parent'        =>  0
        ]);

        DB::table('selections')->insert([
            'created_at'    =>  new DateTime(),
            'updated_at'    =>  new DateTime(),
            'code'          =>  "active",
            'name'          =>  "Active",
            'category'      =>  "contract_status",
            'parent'        =>  0
        ]);

        DB::table('selections')->insert([
            'created_at'    =>  new DateTime(),
            'updated_at'    =>  new DateTime(),
            'code'          =>  "completed",
            'name'          =>  "Completed",
            'category'      =>  "contract_status",
            'parent'        =>  0
        ]);

        DB::table('selections')->insert([
            'created_at'    =>  new DateTime(),
            'updated_at'    =>  new DateTime(),
            'code'          =>  "terminated",
            'name'          =>  "Terminated",
            'category'      =>  "contract_status",
            'parent'        =>  0
        ]);
       
        $this->command->info('Contract Status Successfully completed');

        //contract type ----------------------------------
        DB::table('selections')->insert([
            'created_at'    =>  new DateTime(),
            'updated_at'    =>  new DateTime(),
            'code'          =>  "legalized",
            'name'          =>  "Legalized",
            'category'      =>  "contract_type",
            'parent'        =>  0
        ]);

        DB::table('selections')->insert([
            'created_at'    =>  new DateTime(),
            'updated_at'    =>  new DateTime(),
            'code'          =>  "monthly",
            'name'          =>  "Monthly",
            'category'      =>  "contract_type",
            'parent'        =>  0
        ]);

        $this->command->info('Contract Type Successfully completed');

        //tenant type -----------------------------------
        DB::table('selections')->insert([
            'created_at'    =>  new DateTime(),
            'updated_at'    =>  new DateTime(),
            'code'          =>  "company",
            'name'          =>  "Company",
            'category'      =>  "tenant_type",
            'parent'        =>  0
        ]);

        DB::table('selections')->insert([
            'created_at'    =>  new DateTime(),
            'updated_at'    =>  new DateTime(),
            'code'          =>  "individual",
            'name'          =>  "Individual",
            'category'      =>  "tenant_type",
            'parent'        =>  0
        ]);

        $this->command->info('Tenant Type Successfully completed');


    }
}
