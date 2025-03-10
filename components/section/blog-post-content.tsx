import Image from 'next/image'
import Link from 'next/link'

import MarkdownRenderer from '@/components/markdown-renderer'

import { BlogPost } from '@/lib/types'

interface BlogPostContentProps {
    post: BlogPost
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
    const formattedDate = new Date(post.publishedDate).toLocaleDateString(
        'en-US',
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }
    )

    return (
        <article className='max-w-4xl mx-auto px-4 py-12'>
            <Link
                href='/blog'
                className='inline-flex items-center mb-8 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline'
            >
                <svg
                    className='w-4 h-4 mr-1'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M10 19l-7-7m0 0l7-7m-7 7h18'
                    />
                </svg>
                Back to all posts
            </Link>

            <header className='mb-8'>
                <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>
                    {post.title}
                </h1>

                <div className='flex items-center gap-4 mb-6'>
                    {post.author && (
                        <div className='flex items-center gap-2'>
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
                            <span className='text-gray-700 dark:text-gray-300 font-medium'>
                                {post.author}
                            </span>
                        </div>
                    )}

                    <time
                        className='text-gray-600 dark:text-gray-400'
                        dateTime={post.publishedDate}
                    >
                        {formattedDate}
                    </time>

                    <div className='flex items-center gap-2'>
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className='inline-block rounded-full bg-gray-100 dark:bg-gray-800 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:text-gray-200'
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {post.coverImage && (
                    <div className='relative aspect-video w-full overflow-hidden rounded-lg'>
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className='object-cover'
                            priority
                        />
                    </div>
                )}
            </header>

            <MarkdownRenderer content={post.content} />
        </article>
    )
}
