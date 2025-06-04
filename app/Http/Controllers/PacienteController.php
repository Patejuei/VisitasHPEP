<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class PacienteController extends Controller
{
    public function index() {
        try {

            $pacientes = DB::table('pacientes')
            ->select(
                'rut',
                'dv',
                'nombre',
                'apellido_paterno',
                'apellido_materno'
            )
            ->get();
            return response()->json($pacientes);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al obtener las visitas: ' . $e->getMessage()], 500);
        };
    }
}
