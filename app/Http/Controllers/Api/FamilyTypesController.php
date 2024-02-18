<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\FamilyTypesRepository;

class FamilyTypesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = FamilyTypesRepository::all();
        return response()->json($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $type)
    {
        $data = FamilyTypesRepository::show($type);
        return response()->json($data);
    }
}
