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
        Schema::create('family_contents', function (Blueprint $table) {
            $table->id();
            $table->integer('family_id')->nullable();
            $table->text('contents')->nullable();
            $table->unsignedInteger('create_by')->nullable();
            $table->unsignedInteger('update_by')->nullable();
            $table->timestamps();
        });

        Schema::table('families', function (Blueprint $table) {
            $table->dropColumn('contents');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('family_contents');
    }
};
