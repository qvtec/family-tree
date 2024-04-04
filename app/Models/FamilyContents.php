<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FamilyContents extends Model
{
    protected $fillable = [
        'family_id',
        'contents',
    ];
}
