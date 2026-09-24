<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
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
            'name' => $this->name,
            'category' => $this->category,
            'country' => $this->country,
            'factoryId' => $this->factory?->slug,
            'price' => (float) $this->price,
            'unit' => $this->unit,
            'discount' => $this->discount,
            'art' => $this->art,
            'tint' => $this->tint,
            'image' => $this->image,
            'short' => $this->short,
            'description' => $this->description,
            'features' => $this->features,
            'packaging' => $this->packaging,
            'shelfLife' => $this->shelf_life,
            'moq' => $this->moq,
            'season' => $this->season,
        ];
    }
}
