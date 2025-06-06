<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Paciente extends Model
{
    //
    protected $table = 'pacientes';
    protected $fillable = [
        'rut',
        'dv',
        'nombre',
        'apellido_paterno',
        'apellido_materno',
        'unidad'
    ];
}
