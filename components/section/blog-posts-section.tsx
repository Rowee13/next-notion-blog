import BlogPostCard from '@/components/ui/card/blog-post-card'
import FeaturedPostCard from '@/components/ui/card/featured-post-card'

import { BlogPostMetadata } from '@/lib/types'

interface BlogPostsSectionProps {
    initialPosts: BlogPostMetadata[]
}

export default function BlogPostsSection({
    initialPosts,
}: BlogPostsSectionProps) {
    const posts = initialPosts

    // Use the post at index 1 as the featured post
    const featuredPost = posts.length > 1 ? posts[1] : null

    // Get posts at index 0 and 2 for the "More Stories" section
    const morePosts =
        posts.length > 0
            ? [
                  ...(posts[0] ? [posts[0]] : []),
                  ...(posts.length > 2 ? [posts[2]] : []),
              ]
            : []

    if (posts.length === 0) {
        return (
            <div className='text-center py-12'>
                <p className='text-gray-600 dark:text-gray-400'>
                    No blog posts found.
                </p>
            </div>
        )
    }

    return (
        <div className='w-full space-y-16'>
            {/* Featured Post */}
            {featuredPost && (
                <div className='w-full'>
                    <FeaturedPostCard post={featuredPost} />
                </div>
            )}

            {/* More Stories */}
            {morePosts.length > 0 && (
                <div className='w-full'>
                    <h2 className='text-5xl font-bold mb-8 text-gray-800 dark:text-white'>
                        More Stories
                    </h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 w-full'>
                        {morePosts.map((post) => (
                            <BlogPostCard key={post.id} post={post} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
