<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HighlightResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => (string) $this->id,
            'section' => $this->section,
            'icon' => $this->icon,
            'title' => $this->title,
            'text' => $this->text,
            'linkUrl' => $this->linkUrl,
            'linkLabel' => $this->linkLabel,
            'image' => $this->image,
            'color' => $this->color,
            'statNumber' => $this->statNumber,
            'statLabel' => $this->statLabel,
        ];
    }
}
