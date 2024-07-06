<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use App\shared\ErrorHandler;

class LoginController extends Controller
{
    public function login(Request $request, ErrorHandler $errorHandler)
{
    // Validar los datos de la solicitud.
    $credentials = $request->only(['email', 'password']);

    // Intentar autenticar al usuario con email y contraseña proporcionados.
    if (Auth::attempt($credentials)) {
        // Obtener el usuario autenticado desde el sistema de autenticación.
        $user = Auth::user();
        
        // Generar un token para el usuario.
        $token = $user->createToken('App Token')->plainTextToken;
    
        // Construir la información del usuario para la respuesta.
        $userInformation = [
            'name' => $user->name, // Obtener el nombre del usuario desde el modelo User.
            'email' => $user->email,
            'emailConfirmed' => (bool)$user->email_verified_at, // Convertir a booleano.
        ];
    
        // Construir la respuesta completa.
        $response = [
            'data' => [
                'token' => $token,
                'userInformation' => $userInformation,
                'success' => true,
                'errorsList' => [
                    'collection' => new \stdClass() // Objeto vacío.
                ],
            ],
            'message' => 'Success',
            'statusCode' => Response::HTTP_OK,
        ];
    
        // Devolver la respuesta JSON con el token y la información del usuario.
        return response()->json($response, Response::HTTP_OK);
    } else {
        // Si las credenciales no son válidas, agregar errores a la lista de errores.
        if (!User::where('email', $credentials['email'])->exists()) {
            $errorHandler->addError('The email does not exist.');
        } else {
            $errorHandler->addError('The password is incorrect.');
        }
    }

    // Respuesta para credenciales no válidas.
    return response()->json([
        'data' => [
            'errorsList' => [
                'collection' => $errorHandler->getErrors()
            ],
        ],
        'message' => 'Unauthorized',
        'statusCode' => Response::HTTP_UNAUTHORIZED,
    ], Response::HTTP_UNAUTHORIZED);
}
}
