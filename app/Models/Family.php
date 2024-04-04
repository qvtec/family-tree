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
    ];

    protected $casts = [
        'types' => 'array',
        'pids' => 'array',
    ];

    /**
     * 詳細コンテンツ
     */
    public function contents()
    {
        return $this->hasOne(FamilyContents::class, 'family_id');
    }
}
