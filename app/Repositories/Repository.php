<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;

class Repository
{
    protected $model;

    public function __construct()
    {
        $this->model = new Model();
    }

    /**
    * @return \Illuminate\Database\Eloquent\Collection
    */
    public function all()
    {
        return $this->model->all();
    }

    /**
    * @param int $id
    * @return mixed
    */
    public function show(int $id)
    {
        return $this->findById($id);
    }

    /**
    * @param array $data
    * @return mixed
    */
    public function store(array $data)
    {
        return $this->model->create($data);
    }

    /**
    * @param array $data
    * @param int $id
    * @return mixed
    */
    public function update(array $data, int $id)
    {
        $record = $this->model->find($id);
        return $record->update($data);
    }

    /**
    * @param int $id
    * @return int
    */
    public function delete(int $id)
    {
        return $this->model->destroy($id);
    }

    /**
    * @param int $id
    * @return mixed
    */
    public function findById(int $id)
    {
        return $this->model->findOrFail($id);
    }

    /**
     * ソート更新
     *
     * @return \Illuminate\Http\Response
     */
    public function sortUpdate($data)
    {
        $map = collect($data)
            ->map(function ($item) {
                return [
                    'id' => $item['id'],
                    'order' => $item['order'],
                ];
            })
            ->toArray();
        return $this->model->upsert($map, ['id'], ['order']);
    }
}
