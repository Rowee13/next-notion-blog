import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { BlogPostMetadata } from '@/lib/types'

interface FeaturedPostCardProps {
    post: BlogPostMetadata
}

const FeaturedPostCard: React.FC<FeaturedPostCardProps> = ({ post }) => {
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
            <article className='overflow-hidden rounded-lg bg-background border border-zinc-400 dark:border-zinc-700/80 transition-all duration-200 dark:hover:border-zinc-600 hover:shadow-lg dark:hover:shadow-zinc-700/70'>
                {/* Featured Image - Larger and Full Width */}
                {post.coverImage ? (
                    <div className='relative w-full h-80 sm:h-96 overflow-hidden'>
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className='object-cover transition-transform duration-200 group-hover:scale-105'
                            priority
                        />
                    </div>
                ) : (
                    <div className='relative w-full h-80 sm:h-96 overflow-hidden bg-foreground/10'></div>
                )}

                {/* Content Section */}
                <div className='p-8'>
                    {/* Tags */}
                    <div className='flex flex-wrap items-center gap-2 mb-3'>
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className='inline-block rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1 text-sm font-medium text-gray-800 dark:text-gray-200'
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Title - Larger for Featured Post */}
                    <h2 className='text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4'>
                        {post.title}
                    </h2>

                    {/* Author and Date */}
                    <div className='flex items-center justify-between mb-6'>
                        {post.author && (
                            <div className='flex items-center gap-3'>
                                {post.authorImage && (
                                    <div className='relative w-8 h-8 overflow-hidden rounded-full'>
                                        <Image
                                            src={post.authorImage}
                                            alt={post.author}
                                            fill
                                            className='object-cover'
                                        />
                                    </div>
                                )}
                                <span className='text-sm text-gray-700 dark:text-gray-300'>
                                    {post.author}
                                </span>
                            </div>
                        )}
                        <p className='text-sm text-gray-500 dark:text-gray-400'>
                            {formattedDate}
                        </p>
                    </div>

                    {/* Summary - More visible for Featured Post */}
                    <p className='text-gray-700 dark:text-gray-300 text-base line-clamp-4'>
                        {post.summary}
                    </p>

                    {/* Read More Link */}
                    <div className='mt-6'>
                        <span className='inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors'>
                            Read more
                            <svg
                                className='ml-1 h-4 w-4'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M14 5l7 7m0 0l-7 7m7-7H3'
                                />
                            </svg>
                        </span>
                    </div>
                </div>
            </article>
        </Link>
    )
}

export default FeaturedPostCard
