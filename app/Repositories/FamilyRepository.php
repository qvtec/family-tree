<?php

namespace App\Repositories;

use App\Models\Family;

class FamilyRepository
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

    /**
    * @param int $id
    * @return mixed
    */
    public static function show(int $id)
    {
        return Family::findOrFail($id);
    }

    /**
    * @param array $data
    * @return mixed
    */
    public static function store(array $data)
    {
        return Family::create($data);
    }

    /**
    * @param array $data
    * @param int $id
    * @return mixed
    */
    public static function update(array $data, int $id)
    {
        $record = Family::find($id);
        return $record->update($data);
    }

    /**
    * @param int $id
    * @return int
    */
    public static function delete(int $id)
    {
        return Family::destroy($id);
    }
}
