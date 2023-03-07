
import Link  from 'next/link';

const Navigation = () => {
    return(
        <nav className="flex items-center p-5 max-w-7xl mx-auto">
            <div className="flex items-center space-x-5 flex-1">
                <Link href="/">
                    <img src="/logo.svg" alt="" className="w-44 cursor-pointer fill-black p-4"/>
                </Link>
            </div>
            <div className="flex items-center space-x-5 font-light text-[14px]">
                <h3>Our story</h3>
                <h3>Membership</h3>
                <h3>Write</h3>
                <h3>Sign in</h3>
                <h3 className="text-white bg-black px-4 py-1 rounded-full">Get started</h3>
            </div>
        </nav>
    )
}

export default Navigation;