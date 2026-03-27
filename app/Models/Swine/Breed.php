<?php

namespace App\Models\Swine;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Breed extends Model
{
    use HasFactory;

     protected $table = 'breeds';

    protected $fillable = [
        'name',
        'description',
    ];

    /**
     * A breed can have many swine.
     */
    public function swine()
    {
        return $this->hasMany(Swine::class, 'breed_id');
    }
}
