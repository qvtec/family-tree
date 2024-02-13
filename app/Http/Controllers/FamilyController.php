<?php

namespace App\Http\Controllers;

use App\Models\Family;
use App\Repositories\FamilyRepository;
use App\Repositories\FamilyTypesRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FamilyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $type = 'family';
        $data = FamilyRepository::search($type);
        $familyType = FamilyTypesRepository::search($type);
        return Inertia::render('Tree', ['data' => $data, 'familyType' => $familyType]);
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Family $family)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Family $family)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Family $family)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Family $family)
    {
        //
    }
}
