<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Visitante extends Model
{
    protected $table = 'visitantes';

    protected $fillable = [
        'rut',
        'dv',
        'nombre',
        'apellido_paterno',
        'apellido_materno',
        'telefono',
        'direccion'
    ];
}
