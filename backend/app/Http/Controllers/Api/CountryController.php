<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CountryResource;
use App\Models\Agent;
use App\Models\Country;
use App\Models\Factory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class CountryController extends Controller
{
    public function index()
    {
        return CountryResource::collection(Country::orderBy('name')->get());
    }

    public function store(Request $request)
    {
        $data = $this->validated($request);

        $country = Country::create([
            'slug' => $this->uniqueSlug($data['name']),
            'name' => $data['name'],
            'code' => strtoupper($data['code']),
            'flag_image' => $data['flagImage'] ?? null,
        ]);

        return new CountryResource($country);
    }

    public function update(Request $request, Country $country)
    {
        $data = $this->validated($request, $country);

        $country->update([
            'name' => $data['name'],
            'code' => strtoupper($data['code']),
            'flag_image' => $data['flagImage'] ?? $country->flag_image,
        ]);

        return new CountryResource($country);
    }

    public function destroy(Country $country)
    {
        $inUse = Factory::where('code', $country->code)->exists()
            || Agent::where('code', $country->code)->exists();

        if ($inUse) {
            throw ValidationException::withMessages([
                'name' => ['This country is used by at least one factory or agent. Reassign those first.'],
            ]);
        }

        $country->delete();

        return response()->json(['message' => 'Deleted']);
    }

    private function validated(Request $request, ?Country $country = null): array
    {
        $codeRule = $country
            ? ['required', 'string', 'size:2', 'unique:countries,code,'.$country->id]
            : ['required', 'string', 'size:2', 'unique:countries,code'];

        return $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:countries,name,'.($country->id ?? 'NULL')],
            'code' => $codeRule,
            'flagImage' => ['nullable', 'string'],
        ]);
    }

    private function uniqueSlug(string $name): string
    {
        $base = Str::slug($name) ?: 'country';
        $slug = $base;
        $i = 2;
        while (Country::where('slug', $slug)->exists()) {
            $slug = $base.'-'.$i++;
        }

        return $slug;
    }
}
