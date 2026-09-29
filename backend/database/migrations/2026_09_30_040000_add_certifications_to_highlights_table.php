<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('highlights', function (Blueprint $table) {
            $table->string('section', 40)->change();
            $table->text('text')->nullable()->change();
            $table->string('color', 9)->nullable()->after('image');
        });

        $this->seedCertifications();
    }

    private function seedCertifications(): void
    {
        $certs = [];
        foreach (DB::table('factories')->get() as $factory) {
            foreach (json_decode($factory->certs ?? '[]', true) ?: [] as $cert) {
                $cert = trim($cert);
                if ($cert !== '' && ! in_array($cert, $certs, true)) {
                    $certs[] = $cert;
                }
            }
        }

        $now = now();

        foreach (array_values($certs) as $i => $title) {
            DB::table('highlights')->insert([
                'section' => 'certifications',
                'icon' => 'check',
                'title' => $title,
                'text' => null,
                'linkUrl' => null, 'linkLabel' => null, 'image' => null,
                'color' => $this->hueToHex(($i * 47) % 360),
                'statNumber' => null, 'statLabel' => null,
                'created_at' => $now, 'updated_at' => $now,
            ]);
        }
    }

    private function hueToHex(int $hue): string
    {
        [$r, $g, $b] = $this->hslToRgb($hue / 360, 0.62, 0.55);

        return sprintf('#%02x%02x%02x', $r, $g, $b);
    }

    private function hslToRgb(float $h, float $s, float $l): array
    {
        if ($s === 0.0) {
            $v = (int) round($l * 255);

            return [$v, $v, $v];
        }

        $hue2rgb = function ($p, $q, $t) {
            if ($t < 0) {
                $t += 1;
            }
            if ($t > 1) {
                $t -= 1;
            }
            if ($t < 1 / 6) {
                return $p + ($q - $p) * 6 * $t;
            }
            if ($t < 1 / 2) {
                return $q;
            }
            if ($t < 2 / 3) {
                return $p + ($q - $p) * (2 / 3 - $t) * 6;
            }

            return $p;
        };

        $q = $l < 0.5 ? $l * (1 + $s) : $l + $s - $l * $s;
        $p = 2 * $l - $q;

        return [
            (int) round($hue2rgb($p, $q, $h + 1 / 3) * 255),
            (int) round($hue2rgb($p, $q, $h) * 255),
            (int) round($hue2rgb($p, $q, $h - 1 / 3) * 255),
        ];
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('highlights', function (Blueprint $table) {
            $table->dropColumn('color');
        });
        DB::table('highlights')->where('section', 'certifications')->delete();
    }
};
