<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContractTerminationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contract_terminations', function (Blueprint $table) {
            
            $table->integer('contract_id')->unsigned()->index();

            $table->text('description');

            $table->string('ref_no');

            $table->date('termination_date')->nullable();

            $table->timestamps();

            $table->primary('contract_id');

            $table->integer('user_id')->unsigned()->index();

             //foreign key
            $table->foreign('contract_id')

                ->references('id')

                ->on('contracts');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('contract_terminations');
    }
}
