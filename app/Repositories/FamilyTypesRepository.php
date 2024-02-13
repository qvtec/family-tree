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
    public static function search(string $type)
    {
        $data = FamilyTypes::where('type', $type)->first();
        return $data;
    }

    /**
    * @return \Illuminate\Database\Eloquent\Collection
    */
    public static function all()
    {
        return FamilyTypes::all();
    }

    /**
    * @param int $id
    * @return mixed
    */
    public static function show(int $id)
    {
        return FamilyTypes::findOrFail($id);
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
