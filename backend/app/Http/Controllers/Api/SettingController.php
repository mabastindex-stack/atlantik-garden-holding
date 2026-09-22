<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function show()
    {
        $settings = Setting::first();

        return response()->json([
            'company' => $settings->company,
            'socials' => $settings->socials,
            'agent' => $settings->agent,
        ]);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'company' => ['sometimes', 'array'],
            'socials' => ['sometimes', 'array'],
            'agent' => ['sometimes', 'array'],
        ]);

        $settings = Setting::first();
        $settings->update($data);

        return response()->json([
            'company' => $settings->company,
            'socials' => $settings->socials,
            'agent' => $settings->agent,
        ]);
    }
}
