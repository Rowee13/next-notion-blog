'use client'

import Link from 'next/link'
import { useState } from 'react'

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

    const handleSubmit = () => {
        setLoading(true)
        console.log(name, email)
        setLoading(false)
    }

    return (
        <div className='text-center w-9/12 flex flex-col items-center justify-center gap-4'>
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
                className='text-cyan-100 hover:text-cyan-500'
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
