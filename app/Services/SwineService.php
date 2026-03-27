<?php

namespace App\Services;

use Illuminate\Support\Str;

class SwineService
{
    public function generateTagNumber(): string
    {
        return strtoupper(Str::random(8));
    }
}
