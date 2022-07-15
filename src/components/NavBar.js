import React from "react"
import { NavLink } from "react-router-dom";


export default function NavBar() {
    return (
        <header className="bg-gray-800 opacity-75 top-0">
            <div className="container mx-auto flex justify-center">
                <nav>
                    <NavLink 
                    to="/" 
                    exact  
                    className="md:inflex-flex items-center md:py-6 px-3 mr-4 text-blue-100 hover:text-white md:text-4xl font-bold tracking-wide "
                    activeclassname="text-white">
                        Home
                    </NavLink>
                    <NavLink 
                    to="/post"
                    className="inline-flex items-center py-3 px-3 my-6 rounded text-blue-200 hover:text-white" 
                    >
                        Recent research
                    </NavLink>
                    <NavLink to="/projects" className="inline-flex items-center py-3 px-3 my-6 rounded text-blue-200 hover:text-white">
                        Projects
                    </NavLink>
                    <NavLink to="/about" className="inline-flex items-center py-3 px-3 my-6 rounded text-blue-200 hover:text-white">
                        About
                    </NavLink>
                </nav>
            </div>
        </header>
    )
}