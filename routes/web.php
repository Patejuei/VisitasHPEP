<?php

use App\Http\Controllers\PacienteController;
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


    
Route::get('/ingreso', function () {
    return Inertia::render('ingreso');})->name('ingreso');

Route::get('/historico', function (){
    return Inertia::render('Visitas/Historico');
}) ->name('historico');


// require __DIR__.'/settings.php';
// require __DIR__.'/auth.php';
