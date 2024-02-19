<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageUploadController extends Controller
{
    public function upload(Request $request)
    {
        if ($request->has('image')) {
            $image = $request->input('image');
            [, $split] = explode(';', $image, 2) + [1 => ''];
            [, $split] = explode(',', $split, 2) + [1 => ''];

            $fileData = base64_decode($split, true);
            $finfo = finfo_open(FILEINFO_MIME_TYPE);

            assert(is_resource($finfo));
            $fileType = finfo_buffer($finfo, $fileData);
            $extension = $fileType == 'image/png' ? 'png' : 'jpg';

            $imageName = time().'.'.$extension;
            Storage::putFileAs('uploads', $image, $imageName);
            return response()->json([
                'success' => true,
                'image_url' => asset('images/' . $imageName)
            ]);
        }
        return response()->json(['success' => false]);
    }
}
