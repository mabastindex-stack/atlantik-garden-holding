<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AnnouncementResource;
use App\Models\Announcement;
use Illuminate\Http\Request;

class AnnouncementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return AnnouncementResource::collection(Announcement::orderBy('created_at', 'desc')->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $announcement = Announcement::create($this->withDefaults($this->validated($request)));

        return new AnnouncementResource($announcement);
    }

    /**
     * Display the specified resource.
     */
    public function show(Announcement $announcement)
    {
        return new AnnouncementResource($announcement);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Announcement $announcement)
    {
        $announcement->update($this->withDefaults($this->validated($request, $announcement)));

        return new AnnouncementResource($announcement);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Announcement $announcement)
    {
        $announcement->delete();

        return response()->json(['message' => 'Deleted']);
    }

    private function validated(Request $request, ?Announcement $announcement = null): array
    {
        $slugRule = $announcement
            ? ['sometimes', 'string', 'alpha_dash', 'unique:announcements,slug,'.$announcement->id]
            : ['required', 'string', 'alpha_dash', 'unique:announcements,slug'];

        return $request->validate([
            'slug' => $slugRule,
            'type' => ['nullable', 'in:offer,notice,note'],
            'title' => ['required', 'string'],
            'body' => ['nullable', 'string'],
            'discount' => ['nullable', 'integer', 'min:0', 'max:100'],
            'code' => ['nullable', 'string'],
            'until' => ['nullable', 'date'],
        ]);
    }

    private function withDefaults(array $data): array
    {
        return array_merge([
            'type' => 'offer', 'body' => '', 'discount' => 0, 'code' => '',
        ], array_filter($data, fn ($v) => $v !== null));
    }
}
