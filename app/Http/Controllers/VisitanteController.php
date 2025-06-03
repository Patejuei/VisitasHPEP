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
        try {

            $request->validate([
            'nombre' => 'required|string|max:255',
            'apellido_paterno' => 'required|string|max:255',
            'apellido_materno' => 'required|string|max:255',
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
        $visitante->apellido_paterno = $request->input('apellido_paterno');
        $visitante->apellido_materno = $request->input('apellido_materno');
        $visitante->dv = $request->input('dv');
        $visitante->rut = $request->input('rut');
        $visitante->telefono = $request->input('telefono');
        $visitante->direccion = $request->input('direccion');
        $visitante->save();
        
        return response()->json(['message' => 'Visitante creado exitosamente'], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function show(string $rut)
    {
        try {
            $visita = Visitante::where('rut', $rut)->first();
            if (!$visita) {
                return response()->json(['message' => 'Visita no encontrada'], 404);
            }
            return response()->json($visita, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al obtener la visita: ' . $e->getMessage()], 500);
        }
    }
}
