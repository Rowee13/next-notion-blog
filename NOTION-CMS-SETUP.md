# Setting Up Notion as a CMS for Your Blog

This guide will help you set up Notion as a Content Management System (CMS) for your blog.

## Prerequisites

1. A Notion account
2. Access to the Notion API (sign up at https://developers.notion.com/)

## Step 1: Create a Notion Integration

1. Go to https://www.notion.so/my-integrations
2. Click "New integration"
3. Name your integration (e.g., "Blog CMS")
4. Select the workspace where you'll create your blog database
5. Click "Submit"
6. Copy the "Internal Integration Token" (this will be your `NOTION_API_KEY`)

## Step 2: Create a Notion Database for Blog Posts

1. In Notion, create a new page
2. Add a new database (full page)
3. Set up the following properties:
    - Title (Title type) - for the blog post title
    - Slug (Text type) - for the URL slug
    - PublishedDate (Date type) - for the publication date
    - Summary (Text type) - for the blog post summary
    - Tags (Multi-select type) - for categorizing posts
    - Status (Status type) - with options like "Published", "Draft", etc.
4. Share the database with your integration:

    - Click "Share" in the top right
    - Click "Add people, emails, groups, or integrations"
    - Search for your integration name and select it
    - Click "Invite"

5. Get your database ID:
    - Open your database in a browser
    - Copy the ID from the URL: `https://www.notion.so/workspace/[DATABASE_ID]?v=...`
    - This will be your `NOTION_DATABASE_ID`

## Step 3: Configure Environment Variables

1. Add your Notion API credentials to the `.env.local` file:
    ```
    NOTION_API_KEY=your_notion_api_key_here
    NOTION_DATABASE_ID=your_notion_database_id_here
    ```

## Step 4: Creating Blog Posts in Notion

1. Add a new entry to your Notion database
2. Fill in the following fields:
    - Title: The title of your blog post
    - Slug: The URL-friendly version of the title (e.g., "my-first-blog-post")
    - PublishedDate: The date you want to publish the post
    - Summary: A brief description of the post
    - Tags: Categories for your post
    - Status: Set to "Published" when ready to show on your site
3. Add your content to the page body using Notion's editor
4. The content will be converted to Markdown and displayed on your blog

## Step 5: Customizing the Blog

You can customize the blog components in:

- `components/blog-post-card.tsx` - For the blog post preview cards
- `components/markdown-renderer.tsx` - For styling the blog post content
- `app/(root)/blog/page.tsx` - For the blog listing page
- `app/(root)/blog/[slug]/page.tsx` - For the individual blog post page

## Troubleshooting

- If blog posts aren't showing up, check that:
    - The Notion integration has access to the database
    - The posts have "Published" status
    - The environment variables are set correctly
    - The database structure matches what the code expects

## Additional Resources

- [Notion API Documentation](https://developers.notion.com/reference/intro)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Markdown Documentation](https://github.com/remarkjs/react-markdown)
