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
            'code' => $this->autoCode($data['name']),
            'flag_image' => $data['flagImage'] ?? null,
        ]);

        return new CountryResource($country);
    }

    public function update(Request $request, Country $country)
    {
        $data = $this->validated($request, $country);

        $country->update([
            'name' => $data['name'],
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
        return $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:countries,name,'.($country->id ?? 'NULL')],
            'flagImage' => [$country ? 'nullable' : 'required', 'string'],
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

    private function autoCode(string $name): string
    {
        $letters = strtoupper(preg_replace('/[^A-Za-z]/', '', $name));
        $words = preg_split('/\s+/', trim($name));

        $candidates = [];
        if (count($words) > 1) {
            $candidates[] = strtoupper(substr($words[0], 0, 1).substr($words[1], 0, 1));
        }
        for ($i = 1; $i < strlen($letters); $i++) {
            $candidates[] = substr($letters, 0, 1).substr($letters, $i, 1);
        }

        foreach ($candidates as $code) {
            if (strlen($code) === 2 && ! Country::where('code', $code)->exists()) {
                return $code;
            }
        }

        for ($a = 'A'; $a <= 'Z'; $a++) {
            for ($b = 'A'; $b <= 'Z'; $b++) {
                $code = $a.$b;
                if (! Country::where('code', $code)->exists()) {
                    return $code;
                }
            }
        }

        return 'XX'.random_int(10, 99);
    }
}
