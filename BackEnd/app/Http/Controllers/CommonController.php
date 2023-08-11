<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommonController extends Controller
{
    public function sendMessage(Request $request){
        try{
        $message=new Message;
        $message->sender_id=Auth::id();
        $message->receiver_id=$request->receiver_id;
        $message->message=$request->message;
        $message->save();
        return response()->json([
            'status' => 'success',
        ]);
        } catch(Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        } 

    }
    public function getMessages(){
        try{
        $messages=Message::where('sender_id',Auth::id())->orWhere('receiver_id',Auth::id())->get();
        return response()->json([
            'status' => 'success',
            'message'=>$messages
        ]);
        } catch(Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        } 

    }
}
