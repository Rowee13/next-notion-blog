# Next.js Notion Blog

A modern blog built with Next.js and Notion as a CMS.

## Features

- 🚀 Next.js 15 with App Router
- 📝 Notion as a CMS
- 🎨 Tailwind CSS for styling
- 🌙 Dark mode support
- 📱 Fully responsive design
- 🔍 SEO optimized
- 📊 Markdown rendering with code highlighting

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

## Creating Blog Posts

1. Open your Notion database
2. Create a new page
3. Fill in the following properties:
    - Title: The title of your blog post
    - Slug: The URL-friendly version of the title (e.g., "my-first-blog-post")
    - PublishedDate: The date you want to publish the post
    - Summary: A brief description of the post
    - Tags: Categories for your post
    - Status: Set to "Published" when ready to show on your site
4. Add your content to the page body using Notion's editor

## Customization

You can customize the blog components in:

- `components/blog-post-card.tsx` - For the blog post preview cards
- `components/markdown-renderer.tsx` - For styling the blog post content
- `app/(root)/blog/page.tsx` - For the blog listing page
- `app/(root)/blog/[slug]/page.tsx` - For the individual blog post page

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Notion API](https://developers.notion.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Markdown](https://github.com/remarkjs/react-markdown)
