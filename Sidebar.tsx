import { useState } from "react"
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { RxHamburgerMenu } from "react-icons/rx";
import { FiSlack } from "react-icons/fi";
import { MdHomeFilled } from "react-icons/md";
import { TbMusic } from "react-icons/tb";
import { MdOutlineSportsVolleyball } from "react-icons/md";
import { TbDeviceGamepad2 } from "react-icons/tb";
import { BiMoviePlay } from "react-icons/bi";
import { FaRegNewspaper } from "react-icons/fa";
import { TbHanger } from "react-icons/tb";
import { MdOutlineLightbulb } from "react-icons/md";
import { useEffect } from "react";

const API_KEY = import.meta.env.VITE_API_KEY


function Sidebar({ filter, setFilter, setCategoryId }: {
    filter: string
    setFilter: (filter: string) => void
    setCategoryId: (categoryId: string | null) => void
}) {
    const navigate = useNavigate()

    const [categoriesData, setCategoriesData] = useState<any[]>([])

    const fetchAndSetCategories = async () => {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/videoCategories?key=${API_KEY}&part=snippet&regionCode=us`)
        setCategoriesData(response.data.items)
    }

    useEffect(() => {
        fetchAndSetCategories()
    }, [])

    const mainLinks = [{
        icon: <MdHomeFilled className="text-xl" />,
        name: "Home",
        filterTag: "home",
        categoryId: null
    }]

    const categoriesLinks = [
        {
            icon: <TbMusic className="text-xl" />,
            name: "Music",
            filterTag: "music",
            categoryId: categoriesData.find((items: { snippet: { title: string } }) => items.snippet.title === "Music")?.id
        }, {
            icon: <MdOutlineSportsVolleyball className="text-xl" />,
            name: "Sport",
            filterTag: "sport",
            categoryId: categoriesData.find((items: { snippet: { title: string } }) => items.snippet.title === "Sports")?.id
        }, {
            icon: <TbDeviceGamepad2 className="text-xl" />,
            name: "Gaming",
            filterTag: "gaming",
            categoryId: categoriesData.find((items: { snippet: { title: string } }) => items.snippet.title === "Gaming")?.id
        }, {
            icon: <BiMoviePlay className="text-xl" />,
            name: "Movies",
            filterTag: "movies",
            categoryId: categoriesData.find((items: { snippet: { title: string } }) => items.snippet.title === "Movies")?.id
        }, {
            icon: <FaRegNewspaper className="text-xl" />,
            name: "News",
            filterTag: "news",
            categoryId: categoriesData.find((items: { snippet: { title: string } }) => items.snippet.title === "News & Politics")?.id
        }, {
            icon: <TbHanger className="text-xl" />,
            name: "Fashion",
            filterTag: "fashion",
            categoryId: categoriesData.find((items: { snippet: { title: string } }) => items.snippet.title === "Howto & Style")?.id
        }, {
            icon: <MdOutlineLightbulb className="text-xl" />,
            name: "Course",
            filterTag: "course",
            categoryId: categoriesData.find((items: { snippet: { title: string } }) => items.snippet.title === "Education")?.id
        },
    ]


    const toggleFilter = (filterTag: string, categoryId: string | null) => {
        setFilter(filterTag)
        setCategoryId(categoryId)

    }

    return (
        <div data-bs-toggle="offcanvas" className="w-full h-full text-white bg-[#0c0c0c] ">
            <div className="flex items-center gap-8 w-[85%] mx-auto h-14">
                <a className="" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                    <RxHamburgerMenu className="text-xl" />
                </a>
                <div className="flex items-center gap-1"
                    onClick={() => navigate(`/`)}
                >
                    <FiSlack className="text-3xl text-blue-600" />
                    <span className="text-xl">KAT Streaming</span>
                </div>
            </div>
            <ul className="border-b-[1px] border-zinc-700">
                {mainLinks.map(({ icon, name, filterTag, categoryId }) =>
                    <li
                        key={name}
                        className={`pl-6 py-3 hover:bg-neutral-800 ${filter == filterTag ? "bg-neutral-800" : ""}`}
                        onClick={() => { toggleFilter(filterTag, categoryId); navigate(`/`) }}
                    >
                        <h1 className="flex items-center gap-5">
                            {icon}
                            <span className="text-sm">{name}</span>
                        </h1>
                    </li>
                )}
            </ul>
            <ul className="border-b-[1px] border-zinc-700">
                {categoriesLinks.map(({ icon, name, filterTag, categoryId }) =>
                    <li
                        key={name}
                        className={`pl-6 py-3 hover:bg-neutral-800 ${filter == filterTag ? "bg-neutral-800" : ""}`}
                        onClick={() => toggleFilter(filterTag, categoryId)}
                    >
                        <h1 className="flex items-center gap-5">
                            {icon}
                            <span className="text-sm">{name}</span>
                        </h1>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default Sidebar