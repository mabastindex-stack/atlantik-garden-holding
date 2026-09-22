<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FactoryResource extends JsonResource
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
            'country' => $this->country,
            'code' => $this->code,
            'city' => $this->city,
            'agency' => $this->agency,
            'director' => $this->director,
            'since' => $this->since,
            'employees' => $this->employees,
            'capacity' => $this->capacity,
            'certs' => $this->certs,
            'image' => $this->image,
            'description' => $this->description,
        ];
    }
}
