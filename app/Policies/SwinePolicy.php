<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Swine\Swine;

class SwinePolicy
{
    public function view(User $user, Swine $swine): bool
    {
        return $user->id === $swine->owner_id || $user->isAdmin() || $user->isDA();
    }

    public function update(User $user, Swine $swine): bool
    {
        return $user->id === $swine->owner_id || $user->isAdmin() || $user->isDA();
    }

    public function delete(User $user, Swine $swine): bool
    {
        return $user->id === $swine->owner_id || $user->isAdmin() || $user->isDA();
    }
}
