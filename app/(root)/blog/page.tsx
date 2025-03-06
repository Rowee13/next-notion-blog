import type { Metadata } from 'next'

import BlogPostCard from '@/components/ui/card/blog-post-card'

import { getAllPosts } from '@/lib/notion-api'

export const metadata: Metadata = {
    title: 'Blog',
    description: 'Read our latest blog posts and articles',
}

export const revalidate = 3600 // Revalidate at most every hour

const BlogPage = async () => {
    const posts = await getAllPosts()

    console.log(posts)

    return (
        <section>
            <div className='max-w-7xl mx-auto px-4 py-8 flex flex-col justify-center items-center'>
                <h1 className='text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white'>
                    Blog
                </h1>

                {posts.length === 0 ? (
                    <div className='text-center py-12'>
                        <p className='text-gray-600 dark:text-gray-400'>
                            No blog posts found.
                        </p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full'>
                        {posts.map((post) => (
                            <BlogPostCard key={post.id} post={post} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

export default BlogPage
