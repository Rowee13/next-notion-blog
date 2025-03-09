'use client'

import Link from 'next/link'
import { useState } from 'react'

import { Toaster, toast } from 'react-hot-toast'

import Form from '@/components/forms/waitlist-form'

const WaitlistSection = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleSubmit = async () => {
        // Validate email
        if (!email) {
            toast.error('Email is required')
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            toast.error('Please enter a valid email address')
            return
        }

        setLoading(true)

        try {
            const response = await fetch('/api/waitlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email }),
            })

            const data = await response.json()

            if (response.ok) {
                toast.success('Successfully joined the waitlist!')
                setName('')
                setEmail('')
            } else {
                toast.error(data.error || 'Failed to join waitlist')
            }
        } catch (error) {
            console.error('Error submitting form:', error)
            toast.error('An unexpected error occurred')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='text-center w-9/12 flex flex-col items-center justify-center gap-4'>
            <Toaster position='top-center' />
            <h3>
                This is not just a blog website with Notion as CMS. <br />
                We also setup a waitlist feature saving your data in Notion.{' '}
                <br />
                How cool is that?
            </h3>
            <Link
                href='https://nextjs-notion-waitlist.vercel.app/'
                rel='noopener noreferrer'
                target='_blank'
                className='text-cyan-900  dark:text-cyan-100 dark:hover:text-cyan-500 hover:underline'
            >
                Here&apos;s a reference for this feature.
            </Link>
            <Form
                name={name}
                email={email}
                handleNameChange={handleNameChange}
                handleEmailChange={handleEmailChange}
                loading={loading}
                handleSubmit={handleSubmit}
            />
        </div>
    )
}

export default WaitlistSection
