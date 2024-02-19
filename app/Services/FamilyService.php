<?php

namespace App\Services;

class FamilyService
{
    public function mytypes(string $type)
    {
        $user = auth()->user();
        if ($user->role != 'admin') {
            if (!in_array($type, $user->types) || !in_array($type, $data->types ?? [])) {
                return false;
            }
        }
        return true;
    }
}
