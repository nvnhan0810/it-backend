<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index() {
        $data = Post::with(['publicTags'])->where('is_published', true)
            ->whereDate('published_at', '<=', now())
            ->orderBy('published_at')
            ->paginate(50);

        return response()->json([
            'message' => 'Fetch Posts Successfully!',
            ...$data->toArray(),
        ]);
    }

    public function show(string $slug) {
        $post = Post::with(['publicTags'])
            ->where('is_published', true)
            ->whereDate('published_at', '<=', now())
            ->where('slug', $slug)
            ->first();

        if (!$post) {
            return response()->json([
                'message' => 'Post Not Found',
            ], 404);
        }

        return response()->json([
            'message' => 'Fetch Post Successfully!',
            'data' => $post,
        ]);
    }
}
