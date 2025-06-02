<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\VisitaController;
use App\Http\Controllers\RestriccionController;

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

Route::get('/visitas/historico', function (){
    return Inertia::render('Visitas/Historico');
}) ->name('historico');

// require __DIR__.'/settings.php';
// require __DIR__.'/auth.php';
