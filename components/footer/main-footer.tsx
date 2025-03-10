import Link from 'next/link'

import { FaGithub } from 'react-icons/fa'

const MainFooter = () => {
    return (
        <footer>
            <div className='max-w-7xl mx-auto px-4 py-8 border-t border-foreground/25'>
                <div className='flex flex-row justify-between items-center'>
                    <p>
                        <Link
                            href='https://parrowhorrizonstudio.com'
                            passHref
                            target='_blank'
                            rel='noopener noreferrer'
                            className='hover:text-yellow-400'
                        >
                            Parrow Horrizon Studio
                        </Link>{' '}
                        - {new Date().getFullYear()}
                    </p>
                    <div>
                        <Link
                            href='https://github.com/Rowee13/next-notion-blog'
                            passHref
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            <FaGithub className='w-5 h-5 hover:text-yellow-400' />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default MainFooter
