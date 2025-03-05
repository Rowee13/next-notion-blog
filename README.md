# Next.js Notion Blog

A modern blog built with Next.js and Notion as a CMS.

## Features

- 🚀 Next.js 15 with App Router
- 📝 Notion as a CMS
    - Seamless integration with Notion databases
    - Real-time content updates
    - No need to redeploy when content changes
    - Support for rich text, images, and other Notion blocks
- 🎨 Tailwind CSS for styling
- 🌙 Dark mode support
- 📱 Fully responsive design
- 🔍 SEO optimized
- 📊 Markdown rendering with code highlighting
- 🔄 Automatic conversion from Notion blocks to Markdown
- 🏷️ Tag-based categorization
- 📅 Date-based sorting and filtering

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- A Notion account
- A Notion integration (create one at [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations))

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/next-notion-blog.git
cd next-notion-blog
```

2. Install dependencies:

```bash
npm install
```

3. Set up your Notion database:

```bash
npm run setup-notion
```

This script will guide you through creating a Notion database with the correct structure for your blog.

Alternatively, you can manually set up your Notion database by following the instructions in [NOTION-CMS-SETUP.md](NOTION-CMS-SETUP.md).

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
NOTION_API_KEY=your_notion_api_key_here
NOTION_DATABASE_ID=your_notion_database_id_here
```

## Notion Database Setup in Detail

### 1. Creating a Notion Integration

1. Go to [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Click "New integration"
3. Name your integration (e.g., "Next.js Blog")
4. Select the workspace where you'll create your blog database
5. Set the capabilities (at minimum, you need "Read content" permission)
6. Click "Submit" to create your integration
7. Copy the "Internal Integration Token" - this will be your `NOTION_API_KEY`

### 2. Setting Up the Database

You have two options for setting up your Notion database:

#### Option A: Using the Automated Script

Run the following command:

```bash
npm run create-database
```

This script (`scripts/create-database-in-page.js`) will:

1. Connect to Notion using your API key
2. Create a new database inside an existing Notion page
3. Set up the required properties (Title, Slug, PublishedDate, Summary, Tags)
4. Update your `.env.local` file with the new database ID

#### Option B: Manual Setup

1. Create a new page in Notion
2. Add a database to this page with the following properties:
    - Title (title): The title of your blog post
    - Slug (text): URL-friendly version of the title
    - PublishedDate (date): Publication date
    - Summary (text): Brief description of the post
    - Tags (multi-select): Categories for your post
    - Status (status): Publication status (optional)
3. Share the database with your integration:
    - Click "Share" in the top right of your database
    - Click "Add people, groups, or integrations"
    - Search for your integration name and select it
    - Click "Invite"
4. Copy the database ID from the URL:
    - The database ID is the part after the workspace name and before the question mark
    - Example: `https://www.notion.so/workspace/1a2b3c4d5e6f7g8h9i0j?v=...`
    - In this example, `1a2b3c4d5e6f7g8h9i0j` is your database ID

### 3. Key Files for Notion Integration

- **`lib/notion-api.ts`**: Core file that handles all Notion API interactions

    - `getDatabaseId`: Validates and formats the database ID
    - `getAllPosts`: Fetches all blog posts from the Notion database
    - `getPostBySlug`: Fetches a specific blog post by its slug
    - `pageToPostMetadata`: Converts Notion page properties to blog post metadata

- **`scripts/create-database-in-page.js`**: Creates a properly structured database in an existing Notion page

- **`.env.local`**: Stores your Notion API key and database ID

### 4. How the Connection Works

1. **Initialization**: The app initializes a Notion client using your API key:

    ```typescript
    // From lib/notion-api.ts
    const notion = new Client({ auth: process.env.NOTION_API_KEY })
    ```

2. **Fetching Posts**: When the blog page loads, it calls `getAllPosts()` which:

    - Connects to your Notion database using the database ID
    - Queries all entries, sorted by publication date
    - Converts each Notion page to a blog post metadata object

3. **Fetching a Single Post**: When viewing a specific blog post, `getPostBySlug()`:

    - Queries the database for a page with the matching slug
    - Retrieves the page content as blocks
    - Converts the blocks to Markdown for rendering

4. **Real-time Updates**: Any changes you make in Notion are reflected on your site:
    - Add a new post in Notion → It appears on your blog
    - Edit a post in Notion → Changes appear on your blog
    - No need to redeploy your site

## Markdown Rendering System

This blog uses a sophisticated system to convert Notion content to Markdown and render it beautifully:

### 1. Notion to Markdown Conversion

The `notion-to-md` package converts Notion blocks to Markdown:

```typescript
// From lib/notion-api.ts
import { NotionToMarkdown } from 'notion-to-md'

const n2m = new NotionToMarkdown({ notionClient: notion })

// In getPostBySlug function:
const mdBlocks = await n2m.pageToMarkdown(page.id)
const content = n2m.toMarkdownString(mdBlocks)
```

### 2. Markdown Rendering

The converted Markdown is rendered using `react-markdown` with several plugins:

```typescript
// From components/markdown-renderer.tsx
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'

// These packages enable:
// - remarkGfm: GitHub Flavored Markdown (tables, strikethrough, etc.)
// - rehypeRaw: Render HTML within Markdown
// - rehypeSanitize: Prevent XSS attacks by sanitizing HTML
```

### 3. Code Highlighting

Code blocks from Notion are automatically highlighted using syntax highlighting:

```typescript
// From components/markdown-renderer.tsx
// Code block rendering with syntax highlighting
const components = {
    code({ node, inline, className, children, ...props }) {
        // Implementation of code highlighting
    },
}
```

## Creating Blog Posts

1. Open your Notion database
2. Create a new page
3. Fill in the following properties:
    - Title: The title of your blog post
    - Slug: The URL-friendly version of the title (e.g., "my-first-blog-post")
    - PublishedDate: The date you want to publish the post
    - Summary: A brief description of the post
    - Tags: Categories for your post
    - Status: Set to "Published" when ready to show on your site (if you added this property)
4. Add your content to the page body using Notion's editor
    - All content formatting in Notion will be preserved
    - Images, lists, quotes, code blocks, etc. are all supported
    - Changes are reflected on your site in real-time

## Customization

You can customize the blog components in:

- `components/blog-post-card.tsx` - For the blog post preview cards
- `components/markdown-renderer.tsx` - For styling the blog post content
- `app/(root)/blog/page.tsx` - For the blog listing page
- `app/(root)/blog/[slug]/page.tsx` - For the individual blog post page

## Troubleshooting

### Common Issues

1. **"Could not find database with ID"**: Make sure:

    - Your database ID is correct
    - You've shared the database with your integration
    - Your integration has the necessary permissions

2. **"Could not find property with name or id"**: Make sure your database has all the required properties (Title, Slug, PublishedDate, Summary, Tags)

3. **No posts showing up**: Check that:
    - You have added posts to your database
    - The posts have all required fields filled in
    - If you're filtering by Status, make sure the posts have the correct status

### Debugging

The application logs helpful information to the console:

- Database ID being used
- API request URLs
- Error messages from the Notion API

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Notion API](https://developers.notion.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Markdown](https://github.com/remarkjs/react-markdown)
- [notion-to-md](https://github.com/souvikinator/notion-to-md)
