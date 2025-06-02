<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Visita;
use Illuminate\Container\Attributes\DB;

class VisitasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        $request->validate([
            'fecha_inicio' => 'required|date',
            'rut_visitante' => 'required|string|max:12',
            'rut_paciente' => 'required|string|max:12',
            'idTarjeta' => 'required|string|max:255',
        ]);

        $visita = new Visita();
        $visita->fecha_ingreso = $request->input('fecha_inicio');
        $visita->id_tarjeta = $request->input('idTarjeta');
        $visita->rut_visitante = $request->input('rut_visitante');
        $visita->rut_paciente = $request->input('rut_paciente');
        $visita->save();

        return response()->json(['message' => 'Visita creada exitosamente'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
