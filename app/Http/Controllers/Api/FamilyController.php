<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\FamilyRepository;
use Illuminate\Http\Request;

class FamilyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(string $type)
    {
        $data = FamilyRepository::search($type);
        return $data;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, string $type, int $id)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $type, int $id)
    {
        $data = FamilyRepository::show($id);
        if (!$data || !in_array($type, $data->types)) {
            return [];
        }
        return $data;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        //
    }
}
