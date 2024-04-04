<?php

namespace App\Repositories;

use App\Models\Family;

class FamilyRepository
{
    /**
     * all
     *
     * @return array
     */
    public static function all()
    {
        $list = Family::all();
        return FamilyRepository::formatTreeData($list);
    }

    /**
     * 一覧データ取得
     *
     * @param string $type
     * @return array
     */
    public static function search(string $type)
    {
        $list = Family::whereJsonContains('types', $type)->orderBy('id')->take(600)->get();
        return FamilyRepository::formatTreeData($list);
    }

    /**
    * @param int $id
    * @return mixed
    */
    public static function show(int $id)
    {
        return Family::with('contents')->findOrFail($id);
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
        $record = Family::with('contents')->find($id);
        $res = $record->update($data);
        if ($record->contents) {
            $record->contents->contents = $data['contents'];
            $record->contents->save();
        } else {
            $record->contents()->create([
                'family_id' => $record->id,
                'contents' => $data['contents'],
            ]);
        }
        return $res;
    }

    /**
    * @param int $id
    * @return int
    */
    public static function delete(int $id)
    {
        return Family::destroy($id);
    }

    /**
     * format tree data
     *
     * @param object $list
     * @return void
     */
    private static function formatTreeData($list) {
        $data = [];
        foreach ($list as $item) {
            $father = $list->first(function ($parent) use ($item) {
                return $parent->id == $item->fid;
            });
            $mother = $list->first(function ($parent) use ($item) {
                return $parent->id == $item->mid;
            });

            $childlen = $list->filter(function ($child) use ($item) {
                $parentId = $item->gender == 'male' ? $child->fid : $child->mid;
                return $parentId === $item->id;
            })->pluck('id');
            $childrenIds = array_map('strval', $childlen->toArray());

            $gender = 'O';
            if ($item->gender == 'male') $gender = 'M';
            if ($item->gender == 'female') $gender = 'F';

            $rels = [];
            if ($item->pids) $rels['spouses'] = array_map('strval', $item->pids);
            if (!$childlen->isEmpty()) $rels['children'] = $childrenIds;
            if ($father !== null) $rels['father'] = strval($item->fid);
            if ($mother !== null) $rels['mother'] = strval($item->mid);

            $data[] = [
                'id' => strval($item->id),
                'rels' => $rels,
                'data' => [
                    'first_name' => $item->name,
                    'last_name' => '',
                    'birthday' => $item->birth,
                    'avatar' => '',
                    'gender' => $gender,
                ]
            ];
        }
        return $data;
    }
}
