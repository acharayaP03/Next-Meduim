import Link from "next/link"
import Navigation from "./Navigation";

function Header() {
  return (
  <header className="border-black border-b-[1px] bg-yellow-400 ">
      <div className="border-black border-b-[1px] sticky">
          <Navigation />
      </div>
      <div className="flex justify-between items-center py-10 lg:py-0 max-w-7xl mx-auto">
          <div className="px-10 space-y-5">
              <h1 className="text-8xl max-w-xl font-serif">
                Stay Curious.
              </h1>
              <h2 className="text-[22px] font-light text-gray-800">Discover stories, thinking and expertise <span className="block">from writer on any topic.</span></h2>
              <button className="text-white bg-black px-6 py-2 rounded-full w-1/3">Start reading</button>
          </div>
          <div className="h-[440px]"></div>
      </div>
  </header>
  )
}

export default Header