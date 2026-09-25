<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\HeroSlideResource;
use App\Models\HeroSlide;
use Illuminate\Http\Request;

class HeroSlideController extends Controller
{
    public function index()
    {
        return HeroSlideResource::collection(HeroSlide::orderBy('id')->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'image' => ['required', 'string'],
            'caption' => ['nullable', 'string', 'max:255'],
        ]);

        $slide = HeroSlide::create($data);

        return new HeroSlideResource($slide);
    }

    public function update(Request $request, HeroSlide $heroSlide)
    {
        $data = $request->validate([
            'image' => ['required', 'string'],
            'caption' => ['nullable', 'string', 'max:255'],
        ]);

        $heroSlide->update($data);

        return new HeroSlideResource($heroSlide);
    }

    public function destroy(HeroSlide $heroSlide)
    {
        $heroSlide->delete();

        return response()->json(['message' => 'Deleted']);
    }
}
