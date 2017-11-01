<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDepreciationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('depreciations', function (Blueprint $table) {
            
            $table->increments('id');

            $table->integer('fixed_asset_id')->unsigned();

            $table->date('ob_date');

            $table->decimal('ob_amount');

            $table->date('cb_date');

            $table->decimal('cb_amount');

            $table->decimal('depreciated_value');

            $table->decimal('book_value');

            $table->decimal('cummulative_amount');


            $table->timestamps();
        });
    }
   
    public function down()
    {
        Schema::dropIfExists('depreciations');
    }
}
