import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { BlogPostMetadata } from '@/lib/types'

interface BlogPostCardProps {
    post: BlogPostMetadata
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
    const formattedDate = new Date(post.publishedDate).toLocaleDateString(
        'en-US',
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }
    )

    return (
        <Link href={`/blog/${post.slug}`} className='group'>
            <article className='overflow-hidden rounded-lg bg-background border border-gray-400 dark:border-gray-800 transition-all duration-200 dark:hover:border-gray-600 hover:shadow-lg dark:hover:shadow-gray-700/70'>
                {post.coverImage ? (
                    <div className='relative h-48 w-full overflow-hidden'>
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className='object-cover transition-transform duration-200 group-hover:scale-105'
                        />
                    </div>
                ) : (
                    <div className='relative h-48 w-full overflow-hidden bg-foreground/10'></div>
                )}
                <div className='p-6 min-h-[225px]'>
                    <div className='flex items-center gap-2 mb-2'>
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className='inline-block rounded-full bg-gray-100 dark:bg-gray-800 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:text-gray-200'
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
                        {post.title}
                    </h3>
                    <div className='flex items-center justify-between mb-4'>
                        {post.author && (
                            <div className='flex items-center gap-2'>
                                {post.authorImage && (
                                    <div className='relative w-6 h-6 overflow-hidden rounded-full'>
                                        <Image
                                            src={post.authorImage}
                                            alt={post.author}
                                            fill
                                            className='object-cover'
                                        />
                                    </div>
                                )}
                                <span className='text-xs text-gray-700 dark:text-gray-300'>
                                    {post.author}
                                </span>
                            </div>
                        )}
                        <p className='text-xs text-gray-500 dark:text-gray-400'>
                            {formattedDate}
                        </p>
                    </div>
                    <p className='text-gray-700 dark:text-gray-300 line-clamp-3'>
                        {post.summary}
                    </p>
                </div>
            </article>
        </Link>
    )
}

export default BlogPostCard
