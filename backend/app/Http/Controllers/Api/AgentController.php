<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AgentResource;
use App\Models\Agent;
use Illuminate\Http\Request;

class AgentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return AgentResource::collection(Agent::orderBy('name')->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $agent = Agent::create($this->withDefaults($this->validated($request)));

        return new AgentResource($agent);
    }

    /**
     * Display the specified resource.
     */
    public function show(Agent $agent)
    {
        return new AgentResource($agent);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Agent $agent)
    {
        $agent->update($this->withDefaults($this->validated($request, $agent)));

        return new AgentResource($agent);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Agent $agent)
    {
        $agent->delete();

        return response()->json(['message' => 'Deleted']);
    }

    private function validated(Request $request, ?Agent $agent = null): array
    {
        $slugRule = $agent
            ? ['sometimes', 'string', 'alpha_dash', 'unique:agents,slug,'.$agent->id]
            : ['required', 'string', 'alpha_dash', 'unique:agents,slug'];

        return $request->validate([
            'slug' => $slugRule,
            'name' => ['required', 'string'],
            'contact' => ['nullable', 'string'],
            'role' => ['nullable', 'string'],
            'code' => ['nullable', 'string', 'size:2'],
            'city' => ['nullable', 'string'],
            'territory' => ['nullable', 'string'],
            'phone' => ['required', 'string'],
            'whatsapp' => ['nullable', 'string'],
            'email' => ['nullable', 'email'],
            'hours' => ['nullable', 'string'],
            'logo' => ['nullable', 'string'],
        ]);
    }

    private function withDefaults(array $data): array
    {
        return array_merge([
            'contact' => '', 'role' => '', 'code' => 'KU', 'city' => '',
            'territory' => '', 'whatsapp' => null, 'email' => '', 'hours' => '',
        ], array_filter($data, fn ($v) => $v !== null));
    }
}
