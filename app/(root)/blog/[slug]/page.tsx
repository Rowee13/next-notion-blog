import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import BlogPostContent from '@/components/section/blog-post-content'

import { getAllPosts, getPostBySlug } from '@/lib/notion-api'

export const revalidate = 3600 // Revalidate at most every hour

interface BlogPostPageProps {
    params: {
        slug: string
    }
}

export async function generateMetadata({
    params,
}: BlogPostPageProps): Promise<Metadata> {
    const resolvedParams = await params
    const post = await getPostBySlug(resolvedParams.slug)

    if (!post) {
        return {
            title: 'Post Not Found',
            description: 'The requested blog post could not be found',
        }
    }

    // console.log(`post data:${post}`)

    return {
        title: post.title,
        description: post.summary,
        openGraph: {
            title: post.title,
            description: post.summary,
            type: 'article',
            publishedTime: post.publishedDate,
            modifiedTime: post.lastEditedDate,
            images: post.coverImage ? [post.coverImage] : [],
        },
    }
}

export async function generateStaticParams() {
    const posts = await getAllPosts()

    return posts.map((post) => ({
        slug: post.slug,
    }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const resolvedParams = await params
    const post = await getPostBySlug(resolvedParams.slug)

    if (!post) {
        notFound()
    }

    return <BlogPostContent post={post} />
}
