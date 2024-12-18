import { useState } from "react";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserShield, faBoltLightning } from "@fortawesome/free-solid-svg-icons";
import logo from "/public/images/app-logo.svg";

export default function UnAuthenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center justify-between w-full">
                            <div className="shrink-0 flex items-center justify-center ml-4">
                                <Link
                                    href="/"
                                    className="flex items-center hover:scale-105 hover:text-blue-500 transition-transform"
                                >
                                    <FontAwesomeIcon icon={faBoltLightning} className="h-7"/>
                                    <h1 className="font-bold text-2xl ml-3">Store</h1>
                                </Link>
                            </div>
                            <div className="flex gap-3 h-10">
                                {!user && (
                                    <Link
                                        href={route("login")}
                                        className="flex items-center transition ease-in-out duration-100 text-black border border-zinc-700 rounded-lg py-2 px-3 font-bold cursor-pointer tracking-wider border-transparent hover:bg-zinc-700 hover:text-white"
                                    >
                                        Login
                                    </Link>
                                )}
                                {!user && (
                                    <Link
                                        href={route("register")}
                                        className="flex items-center transition ease-in-out duration-100 text-black border border-zinc-700 rounded-lg py-2 px-3 font-bold cursor-pointer tracking-wider border-transparent hover:bg-zinc-700 hover:text-white"
                                    >
                                        Register
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow dark:bg-stone-700 dark:text-white">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
