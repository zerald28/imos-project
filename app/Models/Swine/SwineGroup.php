<?php

// app/Models/Swine/SwineGroup.php
namespace App\Models\Swine;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SwineGroup extends Model
{
    protected $fillable = ['owner_id', 'name', 'description', 'group_type'];
    protected  $table = 'swine_groups';

    
    public function members(): HasMany
    {
        return $this->hasMany(SwineGroupMember::class);
    }

        public function swine()
    {
        return $this->belongsToMany(Swine::class, 'swine_group_members', 'swine_group_id', 'swine_id')
            ->withTimestamps()
            ->withPivot(['joined_at', 'left_at']);
    }
}

