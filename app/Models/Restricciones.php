<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Restricciones extends Model
{

    protected $table = 'restricciones';

    protected $fillable = [
        'rutPaciente',
        'dvPaciente',
        'rutVisita',
        'dvVisita',
        'motivo'
    ];
}
