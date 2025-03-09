import { NextRequest, NextResponse } from 'next/server'

import { addToWaitlist, checkEmailExists } from '@/lib/waitlist-api'

export async function POST(request: NextRequest) {
    try {
        // Parse the request body
        const body = await request.json()
        const { name, email } = body

        // Validate inputs
        if (!email) {
            return NextResponse.json(
                { success: false, error: 'Email is required' },
                { status: 400 }
            )
        }

        // Check if email is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { success: false, error: 'Invalid email format' },
                { status: 400 }
            )
        }

        // Check if email already exists
        const exists = await checkEmailExists(email)
        if (exists) {
            return NextResponse.json(
                { success: false, error: 'Email already subscribed' },
                { status: 409 }
            )
        }

        // Add to waitlist
        const result = await addToWaitlist(name || 'Anonymous', email)

        if (result.success) {
            return NextResponse.json(
                {
                    success: true,
                    message: 'Successfully added to waitlist',
                    subscriber: result.subscriber,
                },
                { status: 201 }
            )
        } else {
            return NextResponse.json(
                {
                    success: false,
                    error: result.error || 'Failed to add to waitlist',
                },
                { status: 500 }
            )
        }
    } catch (error) {
        console.error('Error in waitlist API:', error)
        return NextResponse.json(
            {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : 'An unexpected error occurred',
            },
            { status: 500 }
        )
    }
}

// Simple GET endpoint to check if the API is working
export async function GET() {
    return NextResponse.json(
        { success: true, message: 'Waitlist API is working' },
        { status: 200 }
    )
}
