<?php

namespace App\Repositories;

use App\Models\FamilyTypes;

class FamilyTypesRepository
{
    /**
     * データ取得
     *
     * @param string $type
     * @return array
     */
    public static function all()
    {
        $data = FamilyTypes::all();
        return $data;
    }

    /**
    * @param string $type
    * @return array
    */
    public static function show(string $type)
    {
        $data = FamilyTypes::where('type', $type)->first();
        return $data;
    }

    /**
    * @param array $data
    * @return mixed
    */
    public static function store(array $data)
    {
        return FamilyTypes::create($data);
    }

    /**
    * @param array $data
    * @param int $id
    * @return mixed
    */
    public static function update(array $data, int $id)
    {
        $record = FamilyTypes::find($id);
        return $record->update($data);
    }

    /**
    * @param int $id
    * @return int
    */
    public static function delete(int $id)
    {
        return FamilyTypes::destroy($id);
    }
}
