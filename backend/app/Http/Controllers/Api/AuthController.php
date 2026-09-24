<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $user = User::where('email', $credentials['email'])->first();

        if (! $user || ! Hash::check($credentials['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Email or password is incorrect.'],
            ]);
        }

        // Only one active session is allowed: signing in anywhere else signs out every other device.
        $user->tokens()->delete();

        $token = $user->createToken($request->userAgent() ?? 'api')->plainTextToken;

        return response()->json([
            'user' => ['name' => $user->name, 'email' => $user->email],
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Signed out']);
    }

    public function me(Request $request)
    {
        return $request->user()->only(['name', 'email']);
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email,'.$user->id],
            'current_password' => ['required', 'string'],
            'new_password' => ['nullable', 'string', 'min:6'],
        ]);

        if (! Hash::check($data['current_password'], $user->password)) {
            throw ValidationException::withMessages([
                'current_password' => ['Your current password is incorrect.'],
            ]);
        }

        $user->name = $data['name'];
        $user->email = $data['email'];
        if (! empty($data['new_password'])) {
            $user->password = $data['new_password'];
        }
        $user->save();

        return $user->only(['name', 'email']);
    }
}
