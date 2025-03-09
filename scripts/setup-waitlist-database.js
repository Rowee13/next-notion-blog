#!/usr/bin/env node
/* eslint-disable */
// This script creates a waitlist database inside an existing Notion page

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
    console.log('\n🚀 Notion Waitlist Database Creator 🚀\n')
    console.log(
        'This script will create a waitlist database inside your existing Notion page.\n'
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

    if (!apiKey) {
        console.error('❌ NOTION_API_KEY not found in .env.local')
        rl.close()
        return
    }

    // Ask for parent page ID
    const parentPageId = await question(
        'Enter the parent page ID where the waitlist database should be created: '
    )

    if (!parentPageId) {
        console.error('❌ Parent page ID is required. Please try again.')
        rl.close()
        return
    }

    console.log(`Using page ID: ${parentPageId}`)

    // Initialize Notion client
    const notion = new Client({ auth: apiKey })

    try {
        // First verify we can access the page
        try {
            await notion.pages.retrieve({ page_id: parentPageId })
            console.log('✅ Successfully accessed the page')
        } catch (error) {
            console.error('❌ Could not access the page:', error.message)
            rl.close()
            return
        }

        console.log('\nCreating a waitlist database inside your page...')

        // Create the database with a simpler structure
        const response = await notion.databases.create({
            parent: {
                type: 'page_id',
                page_id: parentPageId,
            },
            title: [
                {
                    type: 'text',
                    text: {
                        content: 'Waitlist Subscribers',
                    },
                },
            ],
            properties: {
                Name: {
                    title: {},
                },
                Email: {
                    email: {},
                },
                CreatedAt: {
                    date: {},
                },
            },
        })

        console.log('✅ Waitlist database created successfully!')
        console.log(`Waitlist Database ID: ${response.id}`)

        // Update .env.local file with the new database ID
        const updatedEnvVars = []
        let waitlistDatabaseIdAdded = false

        envContent.split('\n').forEach((line) => {
            if (line.startsWith('NOTION_WAITLIST_DATABASE_ID=')) {
                updatedEnvVars.push(
                    `NOTION_WAITLIST_DATABASE_ID=${response.id}`
                )
                waitlistDatabaseIdAdded = true
            } else {
                updatedEnvVars.push(line)
            }
        })

        if (!waitlistDatabaseIdAdded) {
            updatedEnvVars.push(`NOTION_WAITLIST_DATABASE_ID=${response.id}`)
        }

        fs.writeFileSync(envPath, updatedEnvVars.join('\n'))

        console.log(
            '\n✅ Updated .env.local file with the new waitlist database ID'
        )

        console.log('\n🎉 Setup complete! 🎉')
        console.log('\nNext steps:')
        console.log(
            '1. Make sure to share your database with your integration:'
        )
        console.log('   - Open the database in Notion')
        console.log('   - Click "Share" in the top right')
        console.log('   - Add your integration to the share list')
        console.log('2. Restart your Next.js app to apply the changes')
    } catch (error) {
        console.error('❌ Error:', error.message)
    } finally {
        rl.close()
    }
}

main()
