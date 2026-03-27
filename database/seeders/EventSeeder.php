<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
           $events = [

                // ---------------- 2024 Regular Holidays ----------------
            ['title' => "New Year's Day", 'date' => '2024-01-01', 'type' => 'Regular', 'year' => 2024],
            ['title' => "Maundy Thursday", 'date' => '2024-03-28', 'type' => 'Regular', 'year' => 2024],
            ['title' => "Good Friday", 'date' => '2024-03-29', 'type' => 'Regular', 'year' => 2024],
            ['title' => "Araw ng Kagitingan", 'date' => '2024-04-09', 'type' => 'Regular', 'year' => 2024],
            ['title' => "Eid'l Fitr (Feast of Ramadhan)", 'date' => '2024-04-10', 'type' => 'Regular', 'year' => 2024],
            ['title' => "Labor Day", 'date' => '2024-05-01', 'type' => 'Regular', 'year' => 2024],
            ['title' => "Independence Day", 'date' => '2024-06-12', 'type' => 'Regular', 'year' => 2024],
            ['title' => "Eid’l Adha (Feast of Sacrifice)", 'date' => '2024-06-17', 'type' => 'Regular', 'year' => 2024],
            ['title' => "National Heroes Day", 'date' => '2024-08-26', 'type' => 'Regular', 'year' => 2024],
            ['title' => "Bonifacio Day", 'date' => '2024-11-30', 'type' => 'Regular', 'year' => 2024],
            ['title' => "Christmas Day", 'date' => '2024-12-25', 'type' => 'Regular', 'year' => 2024],
            ['title' => "Rizal Day", 'date' => '2024-12-30', 'type' => 'Regular', 'year' => 2024],

            // ---------------- 2024 Special Holidays ----------------
            ['title' => "Ninoy Aquino Day", 'date' => '2024-08-23', 'type' => 'Special', 'year' => 2024],
            ['title' => "All Saints' Day", 'date' => '2024-11-01', 'type' => 'Special', 'year' => 2024],
            ['title' => "Feast of the Immaculate Conception of Mary", 'date' => '2024-12-08', 'type' => 'Special', 'year' => 2024],
            ['title' => "Last Day of the Year", 'date' => '2024-12-31', 'type' => 'Special', 'year' => 2024],
            ['title' => "Additional Special Day", 'date' => '2024-02-09', 'type' => 'Special', 'year' => 2024],
            ['title' => "Chinese New Year", 'date' => '2024-02-10', 'type' => 'Special', 'year' => 2024],
            ['title' => "Black Saturday", 'date' => '2024-03-30', 'type' => 'Special', 'year' => 2024],
            ['title' => "All Souls' Day", 'date' => '2024-11-02', 'type' => 'Special', 'year' => 2024],
            ['title' => "Christmas Eve", 'date' => '2024-12-24', 'type' => 'Special', 'year' => 2024],

            // ---------------- 2025 Regular Holidays ----------------
            ['title' => "New Year's Day", 'date' => '2025-01-01', 'type' => 'Regular', 'year' => 2025],
            ['title' => "Eid'l Fitr (Feast of Ramadhan)", 'date' => '2025-04-01', 'type' => 'Regular', 'year' => 2025],
            ['title' => "Araw ng Kagitingan", 'date' => '2025-04-09', 'type' => 'Regular', 'year' => 2025],
            ['title' => "Maundy Thursday", 'date' => '2025-04-17', 'type' => 'Regular', 'year' => 2025],
            ['title' => "Good Friday", 'date' => '2025-04-18', 'type' => 'Regular', 'year' => 2025],
            ['title' => "Labor Day", 'date' => '2025-05-01', 'type' => 'Regular', 'year' => 2025],
            ['title' => "Eidul Adha (Feast of Sacrifice)", 'date' => '2025-06-06', 'type' => 'Regular', 'year' => 2025],
            ['title' => "Independence Day", 'date' => '2025-06-12', 'type' => 'Regular', 'year' => 2025],
            ['title' => "National Heroes Day", 'date' => '2025-08-25', 'type' => 'Regular', 'year' => 2025],
            ['title' => "Bonifacio Day", 'date' => '2025-11-30', 'type' => 'Regular', 'year' => 2025],
            ['title' => "Christmas Day", 'date' => '2025-12-25', 'type' => 'Regular', 'year' => 2025],
            ['title' => "Rizal Day", 'date' => '2025-12-30', 'type' => 'Regular', 'year' => 2025],

            // ---------------- 2025 Special Holidays ----------------
            ['title' => "Ninoy Aquino Day", 'date' => '2025-08-21', 'type' => 'Special', 'year' => 2025],
            ['title' => "All Saints' Day", 'date' => '2025-11-01', 'type' => 'Special', 'year' => 2025],
            ['title' => "Feast of the Immaculate Conception of Mary", 'date' => '2025-12-08', 'type' => 'Special', 'year' => 2025],
            ['title' => "Last Day of the Year", 'date' => '2025-12-31', 'type' => 'Special', 'year' => 2025],
            ['title' => "Chinese New Year", 'date' => '2025-01-29', 'type' => 'Special', 'year' => 2025],
            ['title' => "Black Saturday", 'date' => '2025-04-19', 'type' => 'Special', 'year' => 2025],
            ['title' => "National and Local Elections", 'date' => '2025-05-12', 'type' => 'Special', 'year' => 2025],
            ['title' => "Christmas Eve", 'date' => '2025-12-24', 'type' => 'Special', 'year' => 2025],
            ['title' => "All Saints' Day Eve", 'date' => '2025-10-31', 'type' => 'Special', 'year' => 2025],
            ['title' => "Proclamation No. 729", 'date' => '2025-07-27', 'type' => 'Special', 'year' => 2025],

            // ---------------- 2026 Regular Holidays ----------------
            ['title' => "New Year's Day", 'date' => '2026-01-01', 'type' => 'Regular', 'year' => 2026],
            ['title' => "Maundy Thursday", 'date' => '2026-04-02', 'type' => 'Regular', 'year' => 2026],
            ['title' => "Good Friday", 'date' => '2026-04-03', 'type' => 'Regular', 'year' => 2026],
            ['title' => "Araw ng Kagitingan", 'date' => '2026-04-09', 'type' => 'Regular', 'year' => 2026],
            ['title' => "Labor Day", 'date' => '2026-05-01', 'type' => 'Regular', 'year' => 2026],
            ['title' => "Independence Day", 'date' => '2026-06-12', 'type' => 'Regular', 'year' => 2026],
            ['title' => "National Heroes Day", 'date' => '2026-08-31', 'type' => 'Regular', 'year' => 2026],
            ['title' => "Bonifacio Day", 'date' => '2026-11-30', 'type' => 'Regular', 'year' => 2026],
            ['title' => "Christmas Day", 'date' => '2026-12-25', 'type' => 'Regular', 'year' => 2026],
            ['title' => "Rizal Day", 'date' => '2026-12-30', 'type' => 'Regular', 'year' => 2026],

            // ---------------- 2026 Special Holidays ----------------
            ['title' => "Ninoy Aquino Day", 'date' => '2026-08-21', 'type' => 'Special', 'year' => 2026],
            ['title' => "All Saints' Day", 'date' => '2026-11-01', 'type' => 'Special', 'year' => 2026],
            ['title' => "Feast of the Immaculate Conception of Mary", 'date' => '2026-12-08', 'type' => 'Special', 'year' => 2026],
            ['title' => "Last Day of the Year", 'date' => '2026-12-31', 'type' => 'Special', 'year' => 2026],
            ['title' => "Chinese New Year", 'date' => '2026-02-17', 'type' => 'Special', 'year' => 2026],
            ['title' => "Black Saturday", 'date' => '2026-04-04', 'type' => 'Special', 'year' => 2026],
            ['title' => "All Souls' Day", 'date' => '2026-11-02', 'type' => 'Special', 'year' => 2026],
            ['title' => "Christmas Eve", 'date' => '2026-12-24', 'type' => 'Special', 'year' => 2026],
        
        ];

        DB::table('events')->insert($events);
    }
}
