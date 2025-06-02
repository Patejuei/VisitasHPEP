<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Restricciones;
use Illuminate\Support\Facades\DB;

class RestriccionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
        try {
        $request->validate([
            'rutPaciente' => 'required|string|max:12',
            'dvPaciente' => 'required|string|max:1',
            'rutVisita' => 'required|string|max:12',
            'dvVisita' => 'required|string|max:1',
            'motivo' => 'required|string|max:255',
        ]);

            $restriccion = new Restricciones();
            $restriccion->rutPaciente = $request->input('rutPaciente');
            $restriccion->dvPaciente = $request->input('dvPaciente');
            $restriccion->rutVisita = $request->input('rutVisita');
            $restriccion->dvVisita = $request->input('dvVisita');
            $restriccion->motivo = $request->input('motivo');
            $restriccion->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Restricción creada exitosamente.',
                'data' => $restriccion
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error al crear la restricción: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $rutPaciente)
    {
        try {
            $restricciones = DB::table('restricciones')
                ->select('id', 'rutPaciente', 'dvPaciente', 'rutVisita', 'dvVisita', 'motivo')
                ->where('rutPaciente', '=', $rutPaciente)
                ->get();
            // if ($restricciones->isEmpty()) {
            //     return response()->json([
            //         'status' => 'error',
            //         'message' => 'No se encontraron restricciones para el paciente con RUT: ' . $rutPaciente
            //     ], 404);
            // }
            return response()->json([
                'status' => 'success',
                'data' => $restricciones,
                'inputData' => [
                    'rutPaciente' => $rutPaciente
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error al obtener las restricciones: ' . $e->getMessage()
            ], 500);
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
