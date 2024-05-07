<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\History;

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
        'create_by',
        'update_by',
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

    /**
     * ユーザ情報
     */
    public function user()
    {
        return $this->hasOne(User::class, 'family_id');
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->create_by = auth()->id();

            History::create([
                'family_id' => $model->id,
                'changes' => json_encode($model->toArray()),
            ]);
        });

        static::updating(function ($model) {
            $model->update_by = auth()->id();

            History::create([
                'family_id' => $model->id,
                'changes' => json_encode($model->getDirty()),
            ]);
        });
    }
}
