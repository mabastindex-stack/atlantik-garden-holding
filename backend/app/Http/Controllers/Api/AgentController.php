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
        $agent = Agent::create($this->validated($request));

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
        $agent->update($this->validated($request, $agent));

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
        $required = $agent ? 'sometimes' : 'required';

        return $request->validate([
            'slug' => $slugRule,
            'name' => [$required, 'string'],
            'contact' => [$required, 'string'],
            'role' => [$required, 'string'],
            'code' => [$required, 'string', 'size:2'],
            'city' => [$required, 'string'],
            'territory' => [$required, 'string'],
            'phone' => [$required, 'string'],
            'whatsapp' => ['nullable', 'string'],
            'email' => [$required, 'email'],
            'hours' => [$required, 'string'],
            'logo' => ['nullable', 'string'],
        ]);
    }
}
