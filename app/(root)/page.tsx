'use client'

import { motion } from 'framer-motion'

import WaitlistSection from '@/components/section/waitlist-section'

import { containerVariants, itemVariants } from '@/lib/animation-variants'

export default function Home() {
    return (
        <section>
            <div className='relative isolate px-6 pt-14 lg:px-8'>
                <motion.div
                    className='mx-auto max-w-2xl flex flex-col items-center justify-center gap-12'
                    variants={containerVariants}
                    initial='hidden'
                    animate='visible'
                >
                    <motion.div className='text-center' variants={itemVariants}>
                        <h1 className='text-balance text-5xl font-semibold tracking-tight text-foreground sm:text-7xl'>
                            <span className='bg-gradient-to-r from-primary to-cyan-500 bg-clip-text font-extrabold text-transparent'>
                                Next Notion
                            </span>{' '}
                            Blog
                        </h1>
                        <p className='mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8'>
                            A blog website built with NextJS and Notion API
                        </p>
                    </motion.div>

                    <WaitlistSection />
                </motion.div>
            </div>
        </section>
    )
}
