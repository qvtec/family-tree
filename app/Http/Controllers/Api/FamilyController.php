<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\FamilyRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
     * Display a listing of the resource.
     */
    public function all()
    {
        $data = FamilyRepository::all();
        return $data;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, string $type)
    {
        $family = $request->all();
        $data = FamilyRepository::store($family);
        return response()->json($data, 201);
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
        return response()->json($data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $type, int $id)
    {
        $family = $request->all();
        $data = FamilyRepository::update($family, $id);
        return response()->json($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $type, int $id)
    {
        FamilyRepository::delete($id);
        return response()->json(null, 204);
    }

    /**
     * Update the specified resource in storage.
     */
    public function nodeUpdate(Request $request, string $type)
    {
        $addNodesData = $request->input('addNodesData');
        $removeNodeId = $request->input('removeNodeId');
        $updateNodesData = $request->input('updateNodesData');
        if (!empty($addNodesData)) {
            foreach($addNodesData as $add) {
                FamilyRepository::store($add);
            }
        }
        if (!empty($updateNodesData)) {
            foreach($updateNodesData as $update) {
                FamilyRepository::update($update, $update['id']);
            }
        }
        if (!empty($removeNodeId)) {
            FamilyRepository::delete($removeNodeId);
        }
        return response()->json();
    }
}
