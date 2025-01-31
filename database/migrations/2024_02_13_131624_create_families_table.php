<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('families', function (Blueprint $table) {
            $table->id();
            $table->json('types')->nullable();
            $table->integer('fid')->nullable();
            $table->integer('mid')->nullable();
            $table->json('pids')->nullable();
            $table->string('name');
            $table->string('yomi')->nullable();
            $table->string('en')->nullable();
            $table->string('gender')->nullable();
            $table->string('birth')->nullable();
            $table->boolean('birthFixed')->default(false);
            $table->string('death')->nullable();
            $table->boolean('deathFixed')->default(false);
            $table->string('relation')->nullable();
            $table->string('memo')->nullable();
            $table->json('tags')->nullable();
            $table->text('contents')->nullable();
            $table->unsignedInteger('create_by')->nullable();
            $table->unsignedInteger('update_by')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('families');
    }
};
