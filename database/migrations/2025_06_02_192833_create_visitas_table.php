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
        Schema::create('visitas', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('visitante_rut');
            $table->foreign("visitante_rut")->references("rut")->on("visitantes")->onDelete("cascade");
            $table->string('paciente_rut');
            $table->foreign("paciente_rut")->references("rut")->on("pacientes")->onDelete("cascade");
            $table->date('fecha_ingreso');
            $table->date('fecha_salida')->nullable();
            $table->string('id_tarjeta');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('visitas');
    }
};
