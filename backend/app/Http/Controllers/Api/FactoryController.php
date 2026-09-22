<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\FactoryResource;
use App\Models\Factory;
use Illuminate\Http\Request;

class FactoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return FactoryResource::collection(Factory::orderBy('since')->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $this->validated($request);

        $factory = Factory::create($data);

        return new FactoryResource($factory);
    }

    /**
     * Display the specified resource.
     */
    public function show(Factory $factory)
    {
        return new FactoryResource($factory);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Factory $factory)
    {
        $data = $this->validated($request, $factory);

        $factory->update($data);

        return new FactoryResource($factory);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Factory $factory)
    {
        $factory->delete();

        return response()->json(['message' => 'Deleted']);
    }

    private function validated(Request $request, ?Factory $factory = null): array
    {
        $slugRule = $factory
            ? ['sometimes', 'string', 'alpha_dash', 'unique:factories,slug,'.$factory->id]
            : ['required', 'string', 'alpha_dash', 'unique:factories,slug'];

        return $request->validate([
            'slug' => $slugRule,
            'country' => ['required', 'string'],
            'code' => ['required', 'string', 'size:2'],
            'city' => ['required', 'string'],
            'agency' => ['required', 'string'],
            'director' => ['required', 'string'],
            'since' => ['required', 'string'],
            'employees' => ['required', 'string'],
            'capacity' => ['required', 'string'],
            'certs' => ['required', 'array'],
            'image' => ['nullable', 'string'],
            'description' => ['required', 'string'],
        ]);
    }
}
