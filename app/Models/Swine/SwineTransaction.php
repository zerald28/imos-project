<?php

namespace App\Models\Swine;

use App\Models\Swine\Swine;
use App\Models\User;

use Illuminate\Database\Eloquent\Model;

class SwineTransaction extends Model
{
      
    protected $fillable = [
        'swine_id',
        'from_owner_id',
        'to_owner_id',
        'transaction_type',
        'notes',
        'performed_by_id',
    ];

    public function swine()
    {
        return $this->belongsTo(Swine::class);
    }

    public function fromOwner()
    {
        return $this->belongsTo(User::class, 'from_owner_id');
    }

    public function toOwner()
    {
        return $this->belongsTo(User::class, 'to_owner_id');
    }

    public function performedBy()
    {
        return $this->belongsTo(User::class, 'performed_by_id');
    }
}
