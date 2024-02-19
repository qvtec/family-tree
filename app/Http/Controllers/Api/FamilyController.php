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
    public function store(Request $request)
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
        $user = auth()->user();
        if ($user->role != 'admin') {
            if (!in_array($type, $user->types) || !in_array($type, $data->types ?? [])) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
        }
        return response()->json($data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        $family = $request->all();
        $data = FamilyRepository::update($family, $id);
        return response()->json($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        FamilyRepository::delete($id);
        return response()->json(null, 204);
    }

    /**
     * Update the specified resource in storage.
     */
    public function nodeUpdate(Request $request, string $type)
    {
        $user = auth()->user();
        if ($user->role != 'admin' && !in_array($type, $user->types)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $addNodesData = $request->input('addNodesData');
        $removeNodeId = $request->input('removeNodeId');
        $updateNodesData = $request->input('updateNodesData');

        if (!empty($addNodesData)) {
            foreach($addNodesData as $add) {
                $str_id = $add['id'];
                unset($add['id']);
                $add['name'] = '';
                $add['types'] = [$type];
                $family = FamilyRepository::store($add);
                if (!empty($updateNodesData)) {
                    foreach($updateNodesData as $i => $update) {
                        foreach($update as $name => $value) {
                            if (!is_array($value)) {
                                if ($value == $str_id) {
                                    $updateNodesData[$i][$name] = $family->id;
                                }
                            } else if (in_array($str_id, $value)) {
                                array_push($updateNodesData[$i][$name], $family->id);
                            }
                        }
                    }
                }
            }
        }
        if (!empty($updateNodesData)) {
            foreach($updateNodesData as $update) {
                if (empty($update['name'])) unset($update['name']);
                FamilyRepository::update($update, $update['id']);
            }
        }
        if (!empty($removeNodeId)) {
            FamilyRepository::delete($removeNodeId);
        }
        return response()->json();
    }
}
