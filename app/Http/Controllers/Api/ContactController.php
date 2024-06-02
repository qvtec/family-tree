<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\FamilyRepository;
use Illuminate\Http\Request;
use App\Services\Slack\SlackFacade as Slack;

class ContactController extends Controller
{
    /**
     * お問い合わせ送信
     */
    public function send(Request $request)
    {
        $name = $request->input('name');
        $email = $request->input('email');
        $message = $request->input('message');
        Slack::send("My Family Treeにお問い合わせがありました: {$name}<{$email}> {$message}");
        return response()->json(['result' => true]);
    }
}
