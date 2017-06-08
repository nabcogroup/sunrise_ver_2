<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVillaGalleriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
         Schema::create('villa_galleries', function (Blueprint $table) {
            
            $table->increments('id');

            $table->timestamps();

            $table->integer('villa_id')->unsigned();

            $table->string('description');

            $table->string('image_name');

            $table->string('mime_type',50);

            //foreign key
            $table->foreign('villa_id')
                ->references('id')
                ->on('villas')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('villa_galleries');
    }
}
