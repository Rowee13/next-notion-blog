import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'About',
    description: 'Learn more about our blog and team',
}

const AboutPage = () => {
    return (
        <section>
            <div className='max-w-7xl mx-auto px-4 py-8 flex flex-col justify-center items-center'>
                <h1 className='text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white'>
                    About
                </h1>
            </div>
        </section>
    )
}

export default AboutPage
