<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = [
        'title', 'slug', 'description', 'content', 'published_at', 'is_published',
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'is_published' => 'boolean',
    ];

    /***** RELATIONSHIPS *****/
    public function tags() {
        return $this->belongsToMany(Tag::class, 'post_tag', 'post_id', 'tag_id')->withCount(['posts']);
    }

    public function publicTags()
    {
        return $this->belongsToMany(Tag::class, 'post_tag', 'post_id', 'tag_id')
            ->withCount(['posts' => function ($postQuery) {
                $postQuery->where('is_published', true)->whereDate('published_at', '<=', now());
            }]);
    }

    public function series()
    {
        return $this->belongsToMany(Series::class, 'series_posts', 'post_id', 'series_id')->orderBy('order');
    }
}
