<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\CommonHelpers;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CreatePostRequest;
use App\Http\Requests\Admin\UpdatePostRequest;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Throwable;
use Illuminate\Support\Str;

class PostController extends Controller
{
    public function index(Request $request) {
        $search = $request->search;

        $posts = Post::with(['tags'])
            ->when($search, function ($searchQuery) use($search) {
                $searchQuery->where('title', 'LIKE', "%{$search}%");
            })
            ->orderBy('created_at', 'DESC')->get();

        return response()->json([
            'message' => 'Fetch posts successfully!',
            'data' => $posts,
        ]);
    }

    public function show(int $id) {
        $post = Post::with(['tags'])->find($id);

        if (!$post) {
            return response()->json([
                'message' => 'Post Not Found',
            ], 404);
        }

        return response()->json([
            'message' => 'Fetch Post successfully!',
            'data' => $post,
        ]);
    }

    public function store(CreatePostRequest $request) {
        $slug = $this->generateSlugForPost($request->title);

        try {
            $validatedData = $request->validated();
            unset($validatedData['tags']);

            $post = Post::create([
                ...$validatedData,
                'slug' => $slug,
            ]);

            if ($request->tags) {
                $tagIds = $this->getTagsInfo($request->tags);

                $post->tags()->sync($tagIds);
            }

            $post->load(['tags']);

            return response()->json([
                'message' => 'Create post successfully!',
                'data' => $post->refresh(),
            ]);
        } catch (Throwable $e) {
            Log::info(__METHOD__, [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'message' => 'Create post failed',
            ], 400);
        }
    }

    public function update(UpdatePostRequest $request, int $id) {
        $post = Post::find($id);

        if (!$post) {
            return response()->json([
                'message' => 'Post Not Found',
            ], 404);
        }

        $validatedData = $request->validated();
        unset($validatedData['tags']);

        $post->update([
            ...$validatedData,
            'description' => $validatedData['description'] ?? DB::raw('NULL'),
        ]);

        if ($request->tags) {
            $tagIds = $this->getTagsInfo($request->tags);

            $post->tags()->sync($tagIds);
        }

        $post->load(['tags']);

        return response()->json([
            'message' => 'Update Post Successfully!',
            'data' => $post->refresh(),
        ]);
    }

    public function destroy(int $id) {
        $post = Post::find($id);

        if (!$post) {
            return response()->json([
                'message' => 'Post Not Found',
            ], 404);
        }

        try {
            $post->tags()->detach();

            $post->delete();

            return response()->json([
                'message' => 'Delete Post Successfully',
            ]);
        } catch (Throwable $e) {
            Log::info(__METHOD__, [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'message' => 'Delete Post Failed',
            ]);
        }
    }

    private function generateSlugForPost(string $title) {
        $slug = CommonHelpers::createSlugFromString($title);

        $post = Post::where('slug', 'like', "$slug-%")
            ->orderBy('id', 'DESC')
            ->first();

        if ($post) {
            $index = Str::afterLast($post->slug, '-');

            if (is_numeric($index)) {
                $slug = CommonHelpers::createSlugFromString($title, ((int) $index) + 1);
            } else {
                $slug = CommonHelpers::createSlugFromString($post->slug, 1);
            }
        }

        return $slug;
    }

    private function getTagsInfo(array $tags) {
        $slugs = [];
        foreach($tags as $tag) {
            $slugs[] = CommonHelpers::createSlugFromString($tag);
        }

        $dbTags = Tag::whereIn('slug', $slugs)->get();
        $result = [];

        foreach($slugs as $index => $slug) {
            $dbTag = $dbTags->where('slug', $slug)->first();

            if ($dbTag) {
                $result[] = $dbTag->id;
            } else {
                $dbTag = Tag::create([
                    'name' => $tags[$index],
                    'slug' => $slug,
                ]);

                $result[] = $dbTag->id;
            }
        }

        return $result;
    }
}
