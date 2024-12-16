<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Post;
use App\Http\Resources\PostResource;
use App\Http\Requests\StorePostRequest;

class PostController extends Controller
{
    public function index() {
        $posts = Post::with('user')->latest()->get();
        $now = now();

        return Inertia::render('Posts/Index', [
            'posts'=> PostResource::collection($posts),
            'now' => $now,
        ]);
    }
    
    public function show($id) {
        $post = Post::findOrFail($id);
    }
    public function store(StorePostRequest $request) {
<<<<<<< Updated upstream
        sleep(3);
        auth()->user()->posts()->create($request->validated());
        return redirect()->route('posts.index')->with('error','Post created successfully!',);
=======
        // sleep(3);
        // auth()->user()->posts()->create($request->validated());
        return redirect()->route('posts.index')->with('message',[
            'type' => 'success',
            'body' =>  'Post created successfully!',
        ]);
>>>>>>> Stashed changes
    }
}
