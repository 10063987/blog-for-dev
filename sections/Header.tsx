// import { TerminalIcon } from '@heroicons/react/24/outline'

import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react';
import Logo from '../components/Logo';
import MoonIcon from '../public/assets/svg/moon.svg'
import SunIcon from '../public/assets/svg/sun.svg'

import { useSession, signIn } from 'next-auth/react';
import FlyoutMenu from '../components/FlyoutMenu';
import MobileMenu from '../components/MobileMenu';

import useMediaQuery from '../hooks/use-media-query'


const Header = () => {

    const { systemTheme, theme, setTheme } = useTheme()

    const [mounted, setMounted] = useState<boolean>(false)

    const { data: session, status } = useSession()

    const [menuOpen, setMenuOpen] = useState(false)

    const containerRef = useRef<HTMLDivElement>(null)

    const isLargeScreen = useMediaQuery(['(min-width: 640px)'], [true], false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const renderThemeChanger = () => {
        if (!mounted) return null

        const currentTheme = theme === 'system' ? systemTheme : theme

        if (currentTheme === 'dark') {
            return <SunIcon onClick={() => setTheme('light')} />
        } else {
            return <MoonIcon onClick={() => setTheme('dark')} />
        }
    }



    return (
        <header className='border-b border-gray-100 dark:border-gray-700'>
            <div className='container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center' >
                {/* Logo  */}
                <Logo />

                <div className='flex items-center space-x-3'>

                    {renderThemeChanger()}


                    {status !== 'loading' && (
                        <div>
                            {!session ? (
                                <button
                                    type="button"
                                    onClick={() => signIn()}
                                    className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 whitespace-nowrap`}
                                >
                                    Sign in
                                </button>
                            ) : (
                                <div>

                                    <button onClick={() => setMenuOpen(pre => !pre)} className='flex items-center space-x-1 sm:space-x-2'>
                                        {/* <img src={session?.user?.image} alt={session.user?.name} /> */}
                                        <p className='flex itemx-center sm:space-x-1'>
                                            <span className='hidden sm:inline-block'>
                                                {session.user?.name?.split(' ')?.[0] ?? 'there'}
                                            </span>
                                        </p>
                                    </button>

                                        <FlyoutMenu show={menuOpen && isLargeScreen} onClose={() => setMenuOpen(false)} containerRef={containerRef} links={[]} />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <MobileMenu show={menuOpen && !isLargeScreen} onClose={() => setMenuOpen(false)} />
        </header>
    );
}

export default Header;