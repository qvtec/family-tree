<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = ['user', 'message'];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->user = auth()->id();
        });
    }
}
