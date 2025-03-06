import { cache } from 'react'

import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import { n2m, notion } from './notion'
import { BlogPost, BlogPostMetadata } from './types'

// Get the raw database ID from environment
const RAW_DATABASE_ID = process.env.NOTION_DATABASE_ID || ''

// Function to check if the ID is for a page or database and handle accordingly
const getDatabaseId = async (id: string): Promise<string> => {
    try {
        // First try to access it as a database
        await notion.databases.retrieve({ database_id: id })
        console.log('Successfully accessed as database')
        return id
    } catch (error: unknown) {
        // If that fails, check if it's a page containing a database
        const notionError = error as { code?: string }
        if (notionError.code === 'object_not_found') {
            try {
                console.log('Trying to access as a page...')
                // Just check if we can access it as a page
                await notion.pages.retrieve({ page_id: id })
                console.log('Successfully accessed as page')

                // If it's a page, we need to find databases within it
                console.log(
                    'Please check if the ID is for a page instead of a database'
                )
                console.log(
                    'If it is a page, you need to create a database inside it and use that database ID'
                )

                return id // Return the original ID for now
            } catch (pageError) {
                console.error('Failed to access as page too:', pageError)
                return id // Return the original ID as fallback
            }
        }
        console.error('Error checking ID type:', error)
        return id // Return the original ID as fallback
    }
}

// Function to convert Notion page to blog post metadata
const pageToPostMetadata = (page: PageObjectResponse): BlogPostMetadata => {
    // Using type assertion for properties since Notion types are complex
    const properties = page.properties as {
        Title?: { title?: { plain_text: string }[] }
        Slug?: { rich_text?: { plain_text: string }[] }
        PublishedDate?: { date?: { start: string } }
        Summary?: { rich_text?: { plain_text: string }[] }
        Tags?: { multi_select?: { name: string }[] }
        Author?: {
            type: string
            people?: {
                id: string
                name?: string
                avatar_url?: string
                person?: { email?: string }
            }[]
        }
    }

    // Extract author information from Person property
    let author = ''
    let authorImage = ''

    // Handle Author property if it exists
    if (properties.Author) {
        // Log the structure for debugging
        console.log('Author property type:', properties.Author.type)

        if (properties.Author.type === 'people' && properties.Author.people) {
            const people = properties.Author.people
            if (people.length > 0) {
                const personData = people[0]
                author = personData.name || ''
                authorImage = personData.avatar_url || ''

                // Log the person data for debugging
                console.log('Person data:', JSON.stringify(personData, null, 2))
            }
        }
    }

    return {
        id: page.id,
        title: properties.Title?.title?.[0]?.plain_text || 'Untitled',
        slug: properties.Slug?.rich_text?.[0]?.plain_text || '',
        publishedDate: properties.PublishedDate?.date?.start || '',
        lastEditedDate: page.last_edited_time || '',
        summary: properties.Summary?.rich_text?.[0]?.plain_text || '',
        coverImage:
            page.cover?.type === 'external'
                ? page.cover.external.url
                : page.cover?.type === 'file'
                  ? page.cover.file.url
                  : '',
        tags: properties.Tags?.multi_select?.map((tag) => tag.name) || [],
        author,
        authorImage,
    }
}

// Get all blog posts (metadata only)
export const getAllPosts = cache(async (): Promise<BlogPostMetadata[]> => {
    try {
        console.log('Using database ID:', RAW_DATABASE_ID)

        // Get the appropriate database ID
        const databaseId = await getDatabaseId(RAW_DATABASE_ID)

        const response = await notion.databases.query({
            database_id: databaseId,
            sorts: [
                {
                    property: 'PublishedDate',
                    direction: 'descending',
                },
            ],
        })

        if (response.results.length > 0) {
            const firstPage = response.results[0] as PageObjectResponse
            console.log(
                'First post Author property:',
                JSON.stringify(firstPage.properties.Author, null, 2)
            )
        }

        const posts = response.results.map((page) =>
            pageToPostMetadata(page as PageObjectResponse)
        )
        return posts
    } catch (error) {
        console.error('Error fetching posts from Notion:', error)
        return []
    }
})

// Get a single blog post by slug
export const getPostBySlug = cache(
    async (slug: string): Promise<BlogPost | null> => {
        try {
            // Get the appropriate database ID
            const databaseId = await getDatabaseId(RAW_DATABASE_ID)

            const response = await notion.databases.query({
                database_id: databaseId,
                filter: {
                    property: 'Slug',
                    rich_text: {
                        equals: slug,
                    },
                },
            })

            if (!response.results.length) {
                return null
            }

            const page = response.results[0] as PageObjectResponse

            // Debug: Log the Author property structure
            console.log(
                'Author property:',
                JSON.stringify(page.properties.Author, null, 2)
            )

            const metadata = pageToPostMetadata(page)

            // Get page blocks and convert to markdown
            const mdBlocks = await n2m.pageToMarkdown(page.id)
            const content = n2m.toMarkdownString(mdBlocks)

            return {
                ...metadata,
                content: content.parent,
            }
        } catch (error) {
            console.error(`Error fetching post with slug ${slug}:`, error)
            return null
        }
    }
)
