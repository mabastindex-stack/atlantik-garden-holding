<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'image' => [
                'required', 'file', 'max:51200',
                'mimetypes:image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime',
            ],
        ]);

        $path = $request->file('image')->store('uploads', 'public');

        return response()->json([
            'url' => Storage::disk('public')->url($path),
        ]);
    }
}
