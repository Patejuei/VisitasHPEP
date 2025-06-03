<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Visita;
use Illuminate\Support\Facades\DB;

class VisitasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $visitas = DB::table('visitas')
                ->join('visitantes', 'visitas.visitante_rut', '=', 'visitantes.rut')
                ->select(
                    'visitas.id',
                    'visitas.fecha_ingreso',
                    'visitantes.nombre as visitante_nombre',
                    'visitantes.apellido_paterno as visitante_apellido'
                )
                ->where('visitas.fecha_salida', '=', null)
                ->get();
            return response()->json($visitas, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al obtener las visitas: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try{

            $request->validate([
                'fecha_inicio' => 'required|date',
                'rut_visitante' => 'required|string|max:12',
                'rut_paciente' => 'required|string|max:12',
                'idTarjeta' => 'required|string|max:255',
            ]);
            
            $visita = new Visita();
            $visita->fecha_ingreso = $request->input('fecha_inicio');
            $visita->id_tarjeta = $request->input('idTarjeta');
            $visita->visitante_rut = $request->input('rut_visitante');
            $visita->paciente_rut = $request->input('rut_paciente');
            $visita->save();
            
            return response()->json(['message' => 'Visita creada exitosamente'], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al crear la visita: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try{
            $visita = DB::table('visitas')
                ->join('visitantes', 'visitas.visitante_rut', '=', 'visitantes.rut')
                ->join('pacientes', 'visitas.paciente_rut', '=', 'pacientes.rut')
                ->select(
                    'visitas.fecha_ingreso',
                    'visitas.fecha_salida',
                    'visitantes.rut as visitante_rut',
                    'visitantes.dv as visitante_dv',
                    'visitantes.nombre as visitante_nombre',
                    'visitantes.apellido_paterno as visitante_apellido',
                    'visitantes.apellido_materno as visitante_apellido_materno',
                    'visitantes.telefono as visitante_telefono',
                    'visitantes.direccion as visitante_direccion',
                    'pacientes.rut as paciente_rut',
                    'pacientes.dv as paciente_dv',
                    'pacientes.nombre as paciente_nombre',
                    'pacientes.apellido_paterno as paciente_apellido',
                    'pacientes.apellido_materno as paciente_apellido_materno',
                    'pacientes.unidad as paciente_unidad',
                    'visitas.id_tarjeta'
                )
                ->where('visitas.id', $id)
                ->first();
            return response()->json($visita, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al obtener la visita: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        try {
            $request->validate([
                'fecha_salida' => 'required|date',
                'id' => 'required|integer|exists:visitas,id',
            ]);
            $id = $request->input('id');

            $visita = Visita::findOrFail($id);
            $visita->fecha_salida = $request->input('fecha_salida');
            $visita->save();

            return response()->json(['message' => 'Visita actualizada exitosamente'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al actualizar la visita: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
