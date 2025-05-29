<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VisitaController extends Controller
{
    public function show(string $id){
        return Inertia::render('Visitas/visita', [
            'id' => $id
        ]);
    }
}
