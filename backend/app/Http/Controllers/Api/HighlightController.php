<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\HighlightResource;
use App\Models\Highlight;
use Illuminate\Http\Request;

class HighlightController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return HighlightResource::collection(Highlight::orderBy('id')->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $highlight = Highlight::create($this->validated($request));

        return new HighlightResource($highlight);
    }

    /**
     * Display the specified resource.
     */
    public function show(Highlight $highlight)
    {
        return new HighlightResource($highlight);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Highlight $highlight)
    {
        $highlight->update($this->validated($request));

        return new HighlightResource($highlight);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Highlight $highlight)
    {
        $highlight->delete();

        return response()->json(['message' => 'Deleted']);
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'section' => ['required', 'in:home_pillars,process_steps,about_pillars'],
            'icon' => ['required', 'string', 'max:40'],
            'title' => ['required', 'string', 'max:150'],
            'text' => ['required', 'string', 'max:600'],
            'linkUrl' => ['nullable', 'string', 'max:255'],
            'linkLabel' => ['nullable', 'string', 'max:100'],
            'image' => ['nullable', 'string'],
            'statNumber' => ['nullable', 'integer', 'min:0'],
            'statLabel' => ['nullable', 'string', 'max:100'],
        ]);
    }
}
