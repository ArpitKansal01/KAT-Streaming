import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { RxHamburgerMenu } from "react-icons/rx";
import { FiSlack } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai";

function Navbar({ search, setSearch }: { search: string, setSearch: (q: string) => void }) {
    const navigate = useNavigate()

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault()
            if (search.trim()) {
                navigate(`/search?query=${search}`)
            } else {
                navigate(`/`)
            }
        }
    }

    return (
        <div className='sticky top-0 z-50 w-full bg-[#0c0c0c]'>
            <div className="flex md:gap-0 gap-2 justify-between h-14 w-[95%] mx-auto">
                <div className="flex items-center md:gap-8 gap-3 cursor-pointer">
                    <a className="" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                        <RxHamburgerMenu className="sm:text-xl text-lg" />
                    </a>
                    <div className="flex items-center gap-1"
                        onClick={() => navigate(`/`)}
                    >
                        <FiSlack className="sm:text-3xl text-2xl text-blue-600" />
                        <span className="sm:text-xl text-lg">KAT Streaming</span>
                    </div>
                </div>

                <div className="flex items-center">
                    <form>
                        <div className="flex item-center sm:h-10 h-9 border-[0.6px] border-neutral-700 rounded-full overflow-hidden">
                            <div className="flex items-center sm:pr-5 pr-3">
                                <input
                                    value={search}
                                    type="text"
                                    placeholder="Search"
                                    className="md:w-96 w-full px-3 sm:text-lg text-md text-zinc-300 placeholder-neutral-500 bg-[#0c0c0c] focus:outline-none"
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                />
                                <AiOutlineClose
                                    onClick={() => setSearch("")}
                                    className={`sm:text-lg text-md cursor-pointer text-neutral-400 ${!search ? `invisible` : "visible"}`} />
                            </div>
                            <button
                                className="w-16 flex items-center justify-center border-l-[1px] border-neutral-700">
                                <CiSearch className="sm:text-2xl text-xl text-neutral-200" />
                            </button>
                        </div>
                    </form>
                </div>

                <div className="lg:block hidden mt-2 ">
                    <button 
                        onClick={() => navigate('/login')} 
                        className="text-white border-[0.1px] rounded border-neutral-700 bg-black-600 hover:bg-neutral-700 px-4 py-2 rounded-md mr-2">
                        Login
                    </button>
                    
                    <button 
                        onClick={() => navigate('/signup')} 
                        className="text-white border-[0.1px] rounded border-neutral-700 bg-black-600 hover:bg-neutral-700 px-4 py-2 rounded-md">
                        Signup
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Navbar