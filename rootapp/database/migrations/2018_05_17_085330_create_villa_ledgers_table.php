<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVillaLedgersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('villa_ledgers', function (Blueprint $table) {

            $table->increments('id');

            $table->unsignedInteger('villa_id');

            $table->string('location',10)->index();

            $table->string('acct_code')->index();

            $table->string('type');

            $table->decimal('amount')->default(0);

            $table->decimal('debit')->default(0);

            $table->decimal('credit')->default(0);

            $table->date('posted_date');

            $table->unsignedInteger('user_id');

            $table->integer('year')->index();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('villa_ledger');
    }
}
