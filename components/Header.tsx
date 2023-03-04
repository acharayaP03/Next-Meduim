import Link from "next/link"
import logo from '../public/logo.svg'
function Header() {
  return (
  <header>
    <div>
        <Link href="/">
           <img src="/logo.svg" alt="" className="w-44 cursor-pointer fill-black p-4"/>
        </Link>
    </div>
  </header>
  )
}

export default Header