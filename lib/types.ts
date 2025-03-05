export interface BlogPost {
    id: string
    title: string
    slug: string
    publishedDate: string
    lastEditedDate: string
    summary: string
    coverImage?: string
    tags: string[]
    content: string
}

export interface BlogPostMetadata {
    id: string
    title: string
    slug: string
    publishedDate: string
    lastEditedDate: string
    summary: string
    coverImage?: string
    tags: string[]
}
