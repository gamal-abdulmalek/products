<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

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

        $token = $user->createToken('auth_token')->plainTextToken;
        $hasPermToCreateProducts = $user->can('create products');

        return response()->json(['token' => $token, 'user' => $user,"product"=>$hasPermToCreateProducts], 200);
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        $user->assignRole('viewer'); 

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['token' => $token, 'user' => $user], 201);
    }

    public function sendOtp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $user = User::where('email', $request->email)->first();

        $otp = rand(100000, 999999);

        $user->otp = $otp;
        $user->otp_expires_at = Carbon::now()->addMinutes(10); 
        $user->save();

        Mail::send('emails.forgot-password', ['otp' => $otp], function ($message) use ($user) {
            $message->to($user->email);
            $message->subject('Your Password Reset OTP');
        });

        return response()->json(['message' => 'OTP has been sent to your email.'], 200);
    }
}
