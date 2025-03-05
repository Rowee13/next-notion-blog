#!/usr/bin/env node
/* eslint-disable */
// This script creates a database inside an existing Notion page

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
    console.log('\n🚀 Notion Database Creator 🚀\n')
    console.log(
        'This script will create a database inside your existing Notion page.\n'
    )

    // Load environment variables
    const envPath = path.join(process.cwd(), '.env.local')
    let envContent = ''
    try {
        envContent = fs.readFileSync(envPath, 'utf8')
    } catch (_) {
        console.error('❌ Could not find .env.local file')
        rl.close()
        return
    }

    // Parse environment variables
    const envVars = {}
    envContent.split('\n').forEach((line) => {
        if (line && !line.startsWith('#')) {
            const [key, value] = line.split('=')
            if (key && value) {
                envVars[key.trim()] = value.trim()
            }
        }
    })

    const apiKey = envVars.NOTION_API_KEY
    const pageId = envVars.NOTION_DATABASE_ID // This is actually a page ID

    if (!apiKey) {
        console.error('❌ NOTION_API_KEY not found in .env.local')
        rl.close()
        return
    }

    if (!pageId) {
        console.error('❌ NOTION_DATABASE_ID not found in .env.local')
        rl.close()
        return
    }

    console.log(`Using page ID: ${pageId}`)

    // Initialize Notion client
    const notion = new Client({ auth: apiKey })

    try {
        // First verify we can access the page
        try {
            await notion.pages.retrieve({ page_id: pageId })
            console.log('✅ Successfully accessed the page')
        } catch (error) {
            console.error('❌ Could not access the page:', error.message)
            rl.close()
            return
        }

        console.log('\nCreating a database inside your page...')

        // Create the database
        const response = await notion.databases.create({
            parent: {
                type: 'page_id',
                page_id: pageId,
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
                    status: {},
                },
            },
        })

        console.log('✅ Database created successfully!')
        console.log(`Database ID: ${response.id}`)

        // Update .env.local file with the new database ID
        const updatedEnvVars = []
        let databaseIdUpdated = false

        envContent.split('\n').forEach((line) => {
            if (line.startsWith('NOTION_DATABASE_ID=')) {
                updatedEnvVars.push(`NOTION_DATABASE_ID=${response.id}`)
                databaseIdUpdated = true
            } else if (line.startsWith('# Original page ID')) {
                updatedEnvVars.push(line)
            } else if (
                line.startsWith('# NOTION_PAGE_ID=') ||
                line.trim() === ''
            ) {
                updatedEnvVars.push(line)
            } else if (line.trim() && !line.startsWith('#')) {
                updatedEnvVars.push(line)
            } else {
                updatedEnvVars.push(line)
            }
        })

        if (!databaseIdUpdated) {
            updatedEnvVars.push(`NOTION_DATABASE_ID=${response.id}`)
        }

        // Add a comment with the original page ID
        updatedEnvVars.push('# Original page ID')
        updatedEnvVars.push(`# NOTION_PAGE_ID=${pageId}`)

        fs.writeFileSync(envPath, updatedEnvVars.join('\n'))

        console.log('\n✅ Updated .env.local file with the new database ID')

        console.log('\n🎉 Setup complete! 🎉')
        console.log('\nNext steps:')
        console.log('1. Restart your Next.js development server')
        console.log('2. Add some blog posts to your new database')
        console.log(
            '3. Set their Status to "Published" to see them on your site'
        )
    } catch (error) {
        console.error('❌ Error:', error.message)
    } finally {
        rl.close()
    }
}

main()
