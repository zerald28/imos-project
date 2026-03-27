<?php
// app/Models/Swine/SwineGroupMember.php
namespace App\Models\Swine;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SwineGroupMember extends Model
{
    protected $fillable = ['swine_group_id', 'swine_id', 'joined_at', 'left_at'];

    public function group(): BelongsTo
    {
        return $this->belongsTo(SwineGroup::class);
    }

    public function swine(): BelongsTo
    {
        return $this->belongsTo(Swine::class);
    }
}
