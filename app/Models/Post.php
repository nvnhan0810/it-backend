<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = [
        'title', 'slug', 'content', 'published_at', 'is_published',
    ];

    /***** RELATIONSHIPS *****/
    public function tags() {
        return $this->belongsToMany(Tag::class, 'post_tag', 'post_id', 'tag_id')->withCount(['posts']);
    }
}
