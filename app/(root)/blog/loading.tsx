import {
    BlogPostCardSkeleton,
    FeaturedPostCardSkeleton,
} from '@/components/ui/card/blog-post-skeleton'

export default function BlogLoading() {
    return (
        <section>
            <div className='max-w-7xl mx-auto px-4 py-8 flex flex-col justify-center items-center'>
                <h1 className='text-5xl font-bold text-left w-full mb-12 text-gray-800 dark:text-white'>
                    Blog
                </h1>

                <div className='w-full space-y-16'>
                    {/* Featured Post Skeleton */}
                    <div className='w-full'>
                        <FeaturedPostCardSkeleton />
                    </div>

                    {/* More Stories Skeleton */}
                    <div className='w-full'>
                        <h2 className='text-5xl font-bold mb-8 text-gray-800 dark:text-white'>
                            More Stories
                        </h2>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 w-full'>
                            <BlogPostCardSkeleton />
                            <BlogPostCardSkeleton />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
