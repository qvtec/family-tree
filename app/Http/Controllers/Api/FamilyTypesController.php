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

    /**
     * Display the specified resource.
     */
    public function userFamilyTypes()
    {
        $user_types = auth()->user()->types;
        $data = FamilyTypesRepository::search($user_types);
        return response()->json($data);
    }
}
