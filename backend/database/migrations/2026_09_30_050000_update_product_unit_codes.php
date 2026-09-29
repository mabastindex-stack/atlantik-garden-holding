<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    private const MAP = [
        'kg' => 'KG',
        'ton' => 'MET/TON',
        'L' => 'LITR',
        'box' => 'BOX',
    ];

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        foreach (self::MAP as $old => $new) {
            DB::table('products')->where('unit', $old)->update(['unit' => $new]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        foreach (self::MAP as $old => $new) {
            DB::table('products')->where('unit', $new)->update(['unit' => $old]);
        }
    }
};
