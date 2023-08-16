<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\SignUp;

class MailController extends Controller
{
public function sendMail(){
    Mail::to('fakemail@gmail.com')->send(new SignUp());
    return view('welcome');
}
}
