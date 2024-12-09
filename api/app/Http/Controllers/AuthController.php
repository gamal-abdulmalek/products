<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user = Auth::user();

        // Return an API token
        $token = $user->createToken('auth_token')->plainTextToken;
        $hasPermToCreateProducts = $user->can('create products');

        return response()->json(['token' => $token, 'user' => $user,"product"=>$hasPermToCreateProducts], 200);
    }
}
