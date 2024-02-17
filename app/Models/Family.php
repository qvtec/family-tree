<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Family extends Model
{
    use HasFactory;

    protected $fillable = [
        'types',
        'fid',
        'mid',
        'pids',
        'name',
        'yomi',
        'en',
        'gender',
        'birth',
        'birthFixed',
        'death',
        'deathFixed',
        'relation',
        'memo',
        'tags',
        'contents',
    ];

    protected $casts = [
        'types' => 'array',
        'pids' => 'array',
    ];
}
