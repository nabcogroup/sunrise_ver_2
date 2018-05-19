<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExpendituresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('expenditures', function (Blueprint $table) {

            $table->increments('id');

            $table->string('transaction_no');

            $table->string('description');  

            $table->string('location');

            $table->integer('villa_id')->unsigned();

            $table->string('expense_type',50);

            $table->integer('acct_code')->index();

            $table->integer('payee_id')->index();

            $table->date('payment_date');

            $table->decimal('amount');

            $table->string('mode_of_payment',50);

            $table->string("bank_provider",50);

            $table->string('payment_ref');

            $table->string('doc_ref');

            $table->string('doc_date');

            $table->string('doc_no');

            $table->integer('user_id');

            $table->boolean('posted')->index();

            $table->timestamps();

            $table->softDeletes();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('expenditures');
    }
}
