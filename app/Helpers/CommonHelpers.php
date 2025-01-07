<?php

namespace App\Helpers;

use Illuminate\Support\Str;

class CommonHelpers {
    public static function createSlugFromString(string $value, int $index = 0): string {
        $result = Str::slug($value, '-');

        if ($index) {
            $result .= "-{$index}";
        }

        return $result;
    }
}
