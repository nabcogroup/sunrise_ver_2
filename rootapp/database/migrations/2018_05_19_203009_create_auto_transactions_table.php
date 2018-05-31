<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAutoTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('auto_transactions', function (Blueprint $table) {
            
            $table->increments('id');
            $table->string('next');
            $table->string('current');
            $table->string('previous');
            $table->enum('type',['inc','hash']);
            $table->string('module');
            
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('auto_transactions');
    }
}
