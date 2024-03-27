<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return User::paginate();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = new User();
        $user->email = $request->get('email');
        $user->name = $request->get('name');
        $user->password = Hash::make($request->get('password'));
        $user->save();
    
        // Creating a token for the user
        $user->remember_token = $user->createToken($request->name)->plainTextToken;
    
        // Storing the token in the remember_token column
        $user->update(['remember_token' => $user->remember_token]);
    
        return response()->json(['User' => $user, 'Token' => $user->remember_token], Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return response()->json(['User' => $user], Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $user->update($request->all());
        return response()->json(['Id' => $user->id, 'Message' => 'User successfully updated'], Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(['Id' => $user->id, 'Message' => 'User successfully removed'], Response::HTTP_ACCEPTED);
    }
}
