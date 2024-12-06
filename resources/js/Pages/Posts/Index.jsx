import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm,router, Link } from '@inertiajs/react';


export default function Index({ posts,now,greeting }) {
    const { data, setData, post, processing, errors,reset,clearErrors } = useForm({
        body: '',
    })
    function submit(e) {
        e.preventDefault()
        post(route('posts.store'),{
            onFinish: () => reset('body'),
            onError: (error) => {
                console.log(error.response.data.errors)
            }
        })
    }
    function refreshPost(){
        router.visit(route('posts.index'), {
            only: ['posts'],
            preserveScroll: true,
        });        
    }
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Posts
                </h2>
            }
        >
            <Head title="Posts" >
                <meta name='description' content='Posts Index' />
            </Head>

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8 space-y-3">
                    {now}
                    <form onSubmit={submit}
                     className='bg-white overflow-hidden shadow-sm sm:rounded-lg p-6'
                    >
                    <label htmlFor="body"
                     className='sr-only'>
                        Body
                    </label>
                        <textarea
                            onFocus={() =>clearErrors('body') }
                            onChange={e => setData('body', e.target.value)}
                            name="body"
                            id="body"
                            cols={30}
                            value={data.value}
                            rows={5}
                            className='border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full'>
                        </textarea>
                            {errors.body && <p className='text-red-500'>{errors.body}</p>}    
                        <button disabled={processing} type='submit' className={`mt-2 bg-gray-700 px-4 py-2 rounded-md font-medium text-white ${processing && 'opacity-50' }`}>Post</button>
                    </form>
                    <div className='py-3 flex justify-center'>
                        <Link 
                        href={route('posts.index')}
                        only={['posts']}
                        preserveScroll
                        className='text-sm text-indigo-700' 
                        type='button'>Refresh Post</Link>
                        {/* <button onClick={refreshPost} className='text-sm text-indigo-700' type='button'>Refresh Post</button> */}
                    </div>
                    {posts.data.map((post) => {
                        return (
                            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                <div key={post.id} className=' rounded-lg text-gray-900 m-3 p-2'>
                                    <div className="font-semibold border-b-2 border-gray-500">
                                        Name : {post.user.name}
                                    </div>
                                    <p className='mt-1'>{post.body}</p>
                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
