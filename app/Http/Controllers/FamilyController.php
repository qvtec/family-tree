<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FamilyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, string $type)
    {
        if ($type == 'all') {
            if (Auth::user()->role != 'admin') {
                abort(403, 'Unauthorized.');
            }
        } else if (!Auth::user()->types || !in_array($type, Auth::user()->types)) {
            abort(403, 'Unauthorized.');
        }

        $id = $request->query('id');
        return Inertia::render('Tree', [
            'type' => $type,
            'id' => $id,
        ]);
    }
}
