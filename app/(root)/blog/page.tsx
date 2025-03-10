import type { Metadata } from 'next'

import BlogPostsSection from '@/components/section/blog-posts-section'

import { getAllPosts } from '@/lib/notion-api'

export const metadata: Metadata = {
    title: 'Blog',
    description: 'Read our latest blog posts and articles',
}

export const revalidate = 3600 // Revalidate at most every hour

const BlogPage = async () => {
    const posts = await getAllPosts()

    return (
        <section>
            <div className='max-w-7xl mx-auto px-4 py-8 flex flex-col justify-center items-center'>
                <h1 className='text-5xl font-bold text-left w-full mb-12 text-gray-800 dark:text-white'>
                    Blog
                </h1>

                <BlogPostsSection initialPosts={posts} />
            </div>
        </section>
    )
}

export default BlogPage
