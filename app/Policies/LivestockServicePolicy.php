<?php

namespace App\Policies;

use App\Models\LivestockService;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class LivestockServicePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, LivestockService $livestockService): bool
    {
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, LivestockService $livestockService): bool
    {
         return $user->id === $livestockService->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, LivestockService $livestockService): bool
    {
        return $user->id === $livestockService->user_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, LivestockService $livestockService): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, LivestockService $livestockService): bool
    {
        return false;
    }
}
