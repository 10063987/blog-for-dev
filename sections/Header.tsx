// import { TerminalIcon } from '@heroicons/react/24/outline'

import  { useTheme } from 'next-themes'
import { useEffect, useState } from 'react';
import Logo from '../components/Logo';
import MoonIcon from '../public/assets/svg/moon.svg'
import SunIcon from '../public/assets/svg/sun.svg'


const Header = () => {

    const {systemTheme, theme, setTheme } = useTheme()

    const [ mounted, setMounted] = useState<boolean>(false)

    useEffect( () => {
        setMounted(true)
    },[])

    const renderThemeChanger = () => {
        if(!mounted) return null

        const currentTheme = theme === 'system' ? systemTheme : theme

        if(currentTheme === 'dark'){
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

                { renderThemeChanger() }
            </div>
        </header>
    );
}

export default Header;