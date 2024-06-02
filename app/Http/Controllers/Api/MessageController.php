<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;
use App\Services\Slack\SlackFacade as Slack;

class MessageController extends Controller
{
    public function index()
    {
        return Message::orderBy('created_at', 'desc')->limit(30)->get();
    }

    public function send(Request $request)
    {
        $validatedData = $request->validate([
            'message' => 'required|string',
        ]);

        $data = Message::create($validatedData);
        Slack::send("My Family Treeにメッセージがあります: <{$data->user}> {$data->message}");

        return response()->json($data, 201);
    }
}
