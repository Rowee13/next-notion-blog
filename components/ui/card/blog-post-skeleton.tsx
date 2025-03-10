'use client'

import React from 'react'

export const BlogPostCardSkeleton: React.FC = () => {
    return (
        <div className='w-full h-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow duration-200'>
            {/* Image skeleton */}
            <div className='w-full aspect-video bg-gray-200 dark:bg-gray-800 animate-pulse' />

            <div className='p-6 space-y-4'>
                {/* Title skeleton */}
                <div className='h-7 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse w-3/4' />

                {/* Date and tags skeleton */}
                <div className='flex items-center gap-2'>
                    <div className='h-4 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse w-24' />
                    <div className='h-4 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse w-16' />
                </div>

                {/* Summary skeleton */}
                <div className='space-y-2'>
                    <div className='h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse' />
                    <div className='h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-5/6' />
                    <div className='h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-4/6' />
                </div>
            </div>
        </div>
    )
}

export const FeaturedPostCardSkeleton: React.FC = () => {
    return (
        <div className='overflow-hidden rounded-lg bg-background border border-gray-400 dark:border-gray-800 transition-all duration-200 hover:shadow-lg dark:hover:shadow-gray-700/70'>
            {/* Featured Image - Larger and Full Width */}
            <div className='relative w-full h-80 sm:h-96 overflow-hidden bg-gray-200 dark:bg-gray-800 animate-pulse' />

            {/* Content Section */}
            <div className='p-8 space-y-6'>
                {/* Tags skeleton */}
                <div className='flex flex-wrap items-center gap-2'>
                    <div className='h-6 w-16 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse' />
                    <div className='h-6 w-20 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse' />
                    <div className='h-6 w-14 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse' />
                </div>

                {/* Title skeleton - Larger for Featured Post */}
                <div className='h-9 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse w-4/5' />

                {/* Author and Date skeleton */}
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        <div className='w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse' />
                        <div className='h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse' />
                    </div>
                    <div className='h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse' />
                </div>

                {/* Summary skeleton - More lines for Featured Post */}
                <div className='space-y-2'>
                    <div className='h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse' />
                    <div className='h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse' />
                    <div className='h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-5/6' />
                    <div className='h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-4/6' />
                </div>

                {/* Read More Link skeleton */}
                <div className='flex items-center'>
                    <div className='h-5 w-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse' />
                    <div className='ml-1 h-4 w-4 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse' />
                </div>
            </div>
        </div>
    )
}

export default BlogPostCardSkeleton
