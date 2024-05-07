<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FamilyContents extends Model
{
    protected $fillable = [
        'family_id',
        'contents',
        'create_by',
        'update_by',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->create_by = auth()->id();

            History::create([
                'family_id' => $model->family_id,
                'changes' => $model->contents,
            ]);
        });

        static::updating(function ($model) {
            $model->update_by = auth()->id();

            History::create([
                'family_id' => $model->family_id,
                'changes' => $model->contents,
            ]);
        });
    }
}
