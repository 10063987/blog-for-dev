import Link from "next/link";
import TerminalIcon from '../public/assets/svg/terminal.svg'

const Logo = () => {
    return (
        <Link href='/'>
            <p className='flex items-center space-x-1 text-blue-600' >
                <TerminalIcon />
                <span className='font-bold text-lg tracking-tight whitespace-nowrap'>Blog for dev</span>
            </p>
        </Link>
    );
}

export default Logo;