<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Visita extends Model
{
    protected $table = 'visitas';

    protected $fillable = [
        'visitante_rut',
        'paciente_rut',
        'fecha_ingreso',
        'fecha_salida',
        'id_tarjeta'
    ];
}
