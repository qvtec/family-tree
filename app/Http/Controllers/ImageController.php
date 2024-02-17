<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    public function getImage($filename)
    {
        if (!auth()->check()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $image = Storage::get('uploads/' . $filename);
        $type = Storage::mimeType($filename);
        return response($image, 200)->header('Content-Type', $type);
    }
}
