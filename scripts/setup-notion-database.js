#!/usr/bin/env node
/* eslint-disable */
// This script uses CommonJS modules for better compatibility with Node.js

const { Client } = require('@notionhq/client')
const readline = require('readline')
const fs = require('fs')
const path = require('path')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

const question = (query) =>
    new Promise((resolve) => rl.question(query, resolve))

async function main() {
    // console.log('\n🚀 Welcome to the Notion Blog CMS Setup Script! 🚀\n')
    // console.log(
    //     'This script will help you set up a Notion database for your blog.\n'
    // )
    // console.log('Prerequisites:')
    // console.log(
    //     '1. You need to have created a Notion integration at https://www.notion.so/my-integrations'
    // )
    // console.log('2. You need to have the integration token ready\n')

    const apiKey = await question(
        'Enter your Notion API Key (integration token): '
    )

    if (!apiKey) {
        console.error('❌ API Key is required. Please try again.')
        rl.close()
        return
    }

    // Initialize Notion client
    const notion = new Client({ auth: apiKey })

    try {
        // Test the API key
        await notion.users.list({})
        // console.log('✅ API Key is valid!\n')

        // console.log("Now, let's create a new database for your blog posts.\n")
        // console.log(
        //     'You need to provide a parent page ID where the database will be created.'
        // )
        // console.log(
        //     'To get a page ID, open the page in Notion and copy the ID from the URL:'
        // )
        // console.log('https://www.notion.so/[workspace]/[page-id]?...\n')

        const parentPageId = await question('Enter the parent page ID: ')

        if (!parentPageId) {
            console.error('❌ Parent page ID is required. Please try again.')
            rl.close()
            return
        }

        // console.log('\nCreating database...')

        // Create the database
        const response = await notion.databases.create({
            parent: {
                type: 'page_id',
                page_id: parentPageId,
            },
            title: [
                {
                    type: 'text',
                    text: {
                        content: 'Blog Posts',
                    },
                },
            ],
            properties: {
                Title: {
                    title: {},
                },
                Slug: {
                    rich_text: {},
                },
                PublishedDate: {
                    date: {},
                },
                Summary: {
                    rich_text: {},
                },
                Tags: {
                    multi_select: {
                        options: [
                            { name: 'Technology', color: 'blue' },
                            { name: 'Design', color: 'green' },
                            { name: 'Tutorial', color: 'orange' },
                            { name: 'News', color: 'red' },
                        ],
                    },
                },
                Status: {
                    status: {
                        options: [
                            { name: 'Draft', color: 'gray' },
                            { name: 'Published', color: 'green' },
                            { name: 'Archived', color: 'red' },
                        ],
                    },
                },
            },
        })

        // console.log('✅ Database created successfully!')
        // console.log(`Database ID: ${response.id}`)

        // Update .env.local file
        const envPath = path.join(process.cwd(), '.env.local')
        let envContent = ''

        try {
            envContent = fs.readFileSync(envPath, 'utf8')
        } catch (_) {
            // File doesn't exist, create it
            envContent = ''
        }

        // Update or add the environment variables
        const envVars = envContent.split('\n')
        const updatedEnvVars = []

        let apiKeyAdded = false
        let databaseIdAdded = false

        for (const line of envVars) {
            if (line.startsWith('NOTION_API_KEY=')) {
                updatedEnvVars.push(`NOTION_API_KEY=${apiKey}`)
                apiKeyAdded = true
            } else if (line.startsWith('NOTION_DATABASE_ID=')) {
                updatedEnvVars.push(`NOTION_DATABASE_ID=${response.id}`)
                databaseIdAdded = true
            } else if (line.trim()) {
                updatedEnvVars.push(line)
            }
        }

        if (!apiKeyAdded) {
            updatedEnvVars.push(`NOTION_API_KEY=${apiKey}`)
        }

        if (!databaseIdAdded) {
            updatedEnvVars.push(`NOTION_DATABASE_ID=${response.id}`)
        }

        fs.writeFileSync(envPath, updatedEnvVars.join('\n'))

        // console.log(
        //     '\n✅ Updated .env.local file with your Notion credentials.'
        // )

        // console.log('\n🎉 Setup complete! 🎉')
        // console.log('\nNext steps:')
        // console.log(
        //     '1. Make sure to share your database with your integration:'
        // )
        // console.log('   - Open the database in Notion')
        // console.log('   - Click "Share" in the top right')
        // console.log('   - Add your integration to the share list')
        // console.log('2. Start adding blog posts to your Notion database')
        // console.log('3. Run your Next.js app to see your blog posts')
    } catch (error) {
        console.error('❌ Error:', error.message)
    } finally {
        rl.close()
    }
}

main()
