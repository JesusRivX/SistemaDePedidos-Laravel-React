<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\RegistroRequest;

class AuthController extends Controller
{
    //
    public function login(LoginRequest $request)
    {
        // Validar el login
        $data = $request->validated();

        // Verificar las credenciales
        if (!Auth::attempt($data)) {
            return response([
                'errors' => ['Las credenciales son incorrectas']
            ], 422);
        }

        // Autenticar al usuario
        $user = Auth::user();

        return [
            'token' => $user->createToken('api_token')->plainTextToken,
            'user' => $user
        ];
    }

    public function register(RegistroRequest $request)
    {
        // Validar el registro
        $data = $request->validated();

        // Crear el usuario
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);

        // Retornar una respuesta
        return [
            'token' => $user->createToken('api_token')->plainTextToken,
            'user' => $user
        ];
    }

    public function logout(Request $request)
    {
        $user = $request->user();

        // Revocar el token del usuario
        $user->currentAccessToken()->delete();

        return [
            'user' => null,
        ];
    }
}
