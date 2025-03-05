import Link from 'next/link'

export default function BlogNotFound() {
    return (
        <div className='flex flex-col items-center justify-center py-24 px-4 text-center'>
            <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>
                Blog Post Not Found
            </h1>
            <p className='text-lg text-gray-600 dark:text-gray-400 mb-8'>
                The blog post you&apos;re looking for doesn&apos;t exist or has
                been removed.
            </p>
            <Link
                href='/blog'
                className='inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800'
            >
                Back to Blog
            </Link>
        </div>
    )
}
