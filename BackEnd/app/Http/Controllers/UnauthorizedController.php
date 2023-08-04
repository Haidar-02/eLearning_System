<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UnauthorizedController extends Controller
{
    public function unauthorized(){
        return response()->json([
            'status' => 'Error',
            'message' => 'Unauthorized',
        ], 200);
    }
}
