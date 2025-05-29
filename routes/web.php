<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\VisitaController;

Route::get('/', function () {
    return Inertia::render('hello');
})->name('home');

Route::get('/salida', function () {
    return Inertia::render('salida');})->name('salida');
    
Route::get('/ingreso', function () {
    return Inertia::render('ingreso');})->name('ingreso');

Route::get('/visita/{id}', [VisitaController::class, 'show'])->name('visita');

Route::get('/visitas/historico', function (){
    return Inertia::render('Visitas/Historico');
}) ->name('historico');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
