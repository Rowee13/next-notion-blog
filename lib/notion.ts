import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'

// Initialize Notion client with options to prevent UUID formatting
const notion = new Client({
    auth: process.env.NOTION_API_KEY,
    // Add a custom fetch function to intercept and log requests
    fetch: (url, options) => {
        // Log the URL for debugging
        console.log('Notion API request URL:', url)
        return fetch(url, options)
    },
})

// Initialize NotionToMarkdown
const n2m = new NotionToMarkdown({ notionClient: notion })

export { n2m, notion }
