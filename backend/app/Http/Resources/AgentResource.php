<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AgentResource extends JsonResource
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
            'contact' => $this->contact,
            'role' => $this->role,
            'code' => $this->code,
            'city' => $this->city,
            'territory' => $this->territory,
            'phone' => $this->phone,
            'whatsapp' => $this->whatsapp,
            'email' => $this->email,
            'hours' => $this->hours,
            'logo' => $this->logo,
        ];
    }
}
