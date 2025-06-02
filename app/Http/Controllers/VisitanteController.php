<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Visitante;
use Illuminate\Container\Attributes\DB;

class VisitanteController extends Controller
{
    public function create(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'apellido' => 'required|string|max:255',
            'rut' => 'required|string|max:12',
            'telefono' => 'nullable|string|max:15',
            'direccion' => 'nullable|max:255',
            'dv' => 'required|string|max:1',
        ]);

        // Verificar si el visitante ya existe
        $existingVisitante = Visitante::where('rut', $request->input('rut'))->first();
        if ($existingVisitante) {
            return response()->json(['message' => 'El visitante ya existe'], 409);
        }
        $visitante = new Visitante();
        $visitante->nombre = $request->input('nombre');
        $visitante->apellido = $request->input('apellido');
        $visitante->rut = $request->input('rut');
        $visitante->telefono = $request->input('telefono');
        $visitante->direccion = $request->input('direccion');
        $visitante->save();

        return response()->json(['message' => 'Visitante creado exitosamente'], 201);
    }

    public function show(string $rut)
    {
        $visitante = Visitante::where('rut', $rut)->first();
        if (!$visitante) {
            return response()->json(['message' => 'Visitante no encontrado'], 404);
        }

        return response()->json($visitante, 200);
    }
}
