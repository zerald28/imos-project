<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\CMS\BlogCategory;

class BlogCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'Program'             => 'Only Admin posts, official announcements',
            'DA'      => 'Updates, policies, supervision info for DA officers',
            'Announcement'      => 'Public or internal notifications',
            'Farmer Tips'       => 'Educational or practical posts for farmers',
            'Farm Exploration'  => 'Farmers share their farm practices, experiences',
            'Community Sharing' => 'Farmers exchange ideas, success stories, Q&A',
            'Others'            => 'Miscellaneous content',
        ];

        foreach ($categories as $name => $purpose) {
            BlogCategory::firstOrCreate(
                ['name' => $name],
                ['slug' => Str::slug($name)]
            );
        }
    }
}
