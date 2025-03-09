import { v4 as uuidv4 } from 'uuid'

import { notion } from './notion'

// Get the waitlist database ID from environment
const WAITLIST_DATABASE_ID = process.env.NOTION_WAITLIST_DATABASE_ID || ''

// Interface for waitlist subscriber
export interface WaitlistSubscriber {
    id: string
    name: string
    email: string
    createdAt: string
    uniqueId: string
}

// Interface for subscription response
export interface SubscriptionResponse {
    success: boolean
    error?: string
    subscriber?: WaitlistSubscriber
}

/**
 * Add a new subscriber to the waitlist
 */
export async function addToWaitlist(
    name: string,
    email: string
): Promise<SubscriptionResponse> {
    try {
        // Check if database ID is available
        if (!WAITLIST_DATABASE_ID) {
            throw new Error('Waitlist database ID is not configured')
        }

        // Generate a unique ID
        const uniqueId = uuidv4()
        const now = new Date().toISOString()

        // Create a new page in the waitlist database
        const response = await notion.pages.create({
            parent: {
                database_id: WAITLIST_DATABASE_ID,
            },
            properties: {
                Name: {
                    title: [
                        {
                            text: {
                                content: name,
                            },
                        },
                    ],
                },
                Email: {
                    email: email,
                },
                CreatedAt: {
                    date: {
                        start: now,
                    },
                },
                // Add ID as a rich_text property
                // This will be added to the database even if the column doesn't exist yet
                ID: {
                    rich_text: [
                        {
                            text: {
                                content: uniqueId,
                            },
                        },
                    ],
                },
            },
        })

        return {
            success: true,
            subscriber: {
                id: response.id,
                name,
                email,
                createdAt: now,
                uniqueId,
            },
        }
    } catch (error) {
        console.error('Error adding to waitlist:', error)
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : 'Unknown error occurred',
        }
    }
}

/**
 * Check if an email already exists in the waitlist
 */
export async function checkEmailExists(email: string): Promise<boolean> {
    try {
        // Check if database ID is available
        if (!WAITLIST_DATABASE_ID) {
            console.error('Waitlist database ID is not configured')
            return false
        }

        const response = await notion.databases.query({
            database_id: WAITLIST_DATABASE_ID,
            filter: {
                property: 'Email',
                email: {
                    equals: email,
                },
            },
        })

        return response.results.length > 0
    } catch (error) {
        console.error('Error checking if email exists:', error)
        return false
    }
}
