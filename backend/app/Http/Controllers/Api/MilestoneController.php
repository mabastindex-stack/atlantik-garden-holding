<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\MilestoneResource;
use App\Models\Milestone;
use Illuminate\Http\Request;

class MilestoneController extends Controller
{
    public function index()
    {
        return MilestoneResource::collection(Milestone::orderBy('year')->orderBy('id')->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'year' => ['required', 'string', 'max:8'],
            'text' => ['required', 'string', 'max:500'],
        ]);

        $milestone = Milestone::create($data);

        return new MilestoneResource($milestone);
    }

    public function update(Request $request, Milestone $milestone)
    {
        $data = $request->validate([
            'year' => ['required', 'string', 'max:8'],
            'text' => ['required', 'string', 'max:500'],
        ]);

        $milestone->update($data);

        return new MilestoneResource($milestone);
    }

    public function destroy(Milestone $milestone)
    {
        $milestone->delete();

        return response()->json(['message' => 'Deleted']);
    }
}
