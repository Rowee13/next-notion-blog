'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// import DarkModeButton from '@/components/ui/buttons/dark-mode-btn'

import { NAV_LINKS } from '@/constant/nav-links'

const MainHeader = () => {
    const pathname = usePathname()

    return (
        <header>
            <div className='max-w-7xl mx-auto flex flex-row justify-between items-center px-4 py-8 z-50'>
                <div>
                    <Link
                        href='/'
                        className='text-2xl lg:text-3xl font-[family-name:var(--font-bebas-neue)] font-bold flex flex-row items-center gap-4'
                    >
                        <Image
                            src='/yellow-theme/next-notion-logo-yellow.png'
                            alt='logo'
                            width={40}
                            height={40}
                        />
                        Next Notion Blog
                    </Link>
                </div>
                <nav>
                    <ul className='flex flex-row space-x-3 lg:space-x-6'>
                        {NAV_LINKS.map((link) => (
                            <li
                                key={link.href}
                                className={`px-2 py-1 ${pathname === link.href ? 'font-bold text-primary' : 'hover:underline'} `}
                            >
                                <Link href={link.href}>{link.label}</Link>
                            </li>
                        ))}
                        {/* <li>
                            <DarkModeButton />
                        </li> */}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default MainHeader
