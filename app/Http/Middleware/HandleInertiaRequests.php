<?php

namespace App\Http\Middleware;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
            ],
            'greeting' => 'Hello World!',
<<<<<<< Updated upstream
            'message' => collect(Arr::only($request->session()->all(),['success','error']))->mapWithKeys(
                function($body,$key){
                    return [
                        'type' => $key,
                        'body' => $body,
                    ];
                }
            ),
            'can' => [
                "post_create" => $user && $user->can('create',Post::class)
=======
            'message' => $request->session()->get('message'),
            'can' => [
                'post_create' => auth()->user()->can('create',Post::class),
>>>>>>> Stashed changes
            ],
        ];
    }
}
