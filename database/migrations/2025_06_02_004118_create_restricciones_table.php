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
        Schema::create('restricciones', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('rutPaciente', 12);
            $table->string('dvPaciente', 1);
            $table->string('rutVisita', 12);
            $table->string('dvVisita', 1);
            $table->string('motivo', 255);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('restricciones');
    }
};
