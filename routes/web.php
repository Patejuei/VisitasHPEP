<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\VisitaController;
use App\Http\Controllers\RestriccionController;
use App\Http\Controllers\VisitasController;
use App\Http\Controllers\VisitanteController;

Route::get('/', function () {
    return Inertia::render('hello');
})->name('home');

Route::get('/restriccion', function () {
    return Inertia::render('restriccion');})->name('restriccion');

Route::get('/restricciones/{rutPaciente}', [RestriccionController::class, 'show'])->name('restricciones.all');

Route::post('/restricciones', [RestriccionController::class, 'store'])->name('restricciones.store');
    
Route::get('/ingreso', function () {
    return Inertia::render('ingreso');})->name('ingreso');

Route::get('/visita/{id}', [VisitaController::class, 'show'])->name('visita');

Route::post('/visitas', [VisitasController::class, 'store'])->name('visitas.store');
Route::get('/visitas', [VisitasController::class, 'index'])->name('visitas.index');
Route::get('/visitas/{id}', [VisitasController::class, 'show'])->name('visitas.show');
Route::get('/visitantes/{rut}', [VisitanteController::class, 'show'])->name('visitantes.show');

Route::post('/visitantes', [VisitanteController::class, 'create'])->name('visitantes.create');
Route::get('/visitas/historico', function (){
    return Inertia::render('Visitas/Historico');
}) ->name('historico');

// require __DIR__.'/settings.php';
// require __DIR__.'/auth.php';
