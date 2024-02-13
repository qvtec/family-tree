<?php

namespace App\Repositories;

use App\Models\Family;
use App\Repositories\Repository;

class FamilyRepository extends Repository
{
    /**
     * 一覧データ取得
     *
     * @param string $type
     * @return array
     */
    public static function search(string $type)
    {
        $list = Family::whereJsonContains('types', $type)->get();
        return $list;
    }
}
