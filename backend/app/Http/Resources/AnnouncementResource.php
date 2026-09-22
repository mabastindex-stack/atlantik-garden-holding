<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AnnouncementResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->slug,
            'type' => $this->type,
            'title' => $this->title,
            'body' => $this->body,
            'discount' => $this->discount,
            'code' => $this->code,
            'until' => $this->until?->toDateString(),
        ];
    }
}
