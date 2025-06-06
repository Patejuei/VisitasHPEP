<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RestriccionController;
use App\Http\Controllers\VisitasController;
use App\Http\Controllers\VisitanteController;
use App\Http\Controllers\VisitaController;
use App\Http\Controllers\PacienteController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/restricciones/{rutPaciente}', [RestriccionController::class, 'show'])->name('restricciones.all');

Route::post('/restricciones', [RestriccionController::class, 'store'])->name('restricciones.store');

Route::get('/visita/{id}', [VisitaController::class, 'show'])->name('visita');

Route::get('/visitas/historico/all', [VisitasController::class, 'indexAll'])->name('visitas.indexAll');

Route::post('/visitas', [VisitasController::class, 'store'])->name('visitas.store');

Route::get('/visitas', [VisitasController::class, 'index'])->name('visitas.index');

Route::get('/visitas/{id}', [VisitasController::class, 'show'])->name('visitas.show');

Route::get('/visitantes/{rut}', [VisitanteController::class, 'show'])->name('visitantes.show');

Route::patch('/visitas', [VisitasController::class, 'update'])->name('visitas.update');

Route::post('/visitantes', [VisitanteController::class, 'create'])->name('visitantes.create');

Route::get('/pacientes', [PacienteController::class, 'index'])->name('getPacientes');
