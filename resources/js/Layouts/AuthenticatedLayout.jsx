import { useState } from "react";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserShield, faBoltLightning } from "@fortawesome/free-solid-svg-icons";
import logo from "/public/images/app-logo.svg";

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center justify-center ml-4">
                                <Link
                                    href="/"
                                    className="flex items-center hover:scale-105 hover:text-blue-500 transition-transform"
                                >
                                    <FontAwesomeIcon icon={faBoltLightning} className="h-7"/>
                                    <h1 className="font-bold text-2xl ml-3">Store</h1>
                                </Link>
                            </div>

                            <div className="hidden space-x-5 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    Dashboard
                                </NavLink>
                                {user.role === "client" && (
                                    <NavLink
                                        href={route("shopping-bag.list")}
                                        active={route().current("shopping-bag.list")}
                                    >
                                        Shopping Bag
                                    </NavLink>
                                )}
                                {user.role === "client" && (
                                    <NavLink
                                        href={route("orders.index")}
                                        active={route().current("orders.index")}
                                    >
                                        Orders
                                    </NavLink>
                                )}
                                {user.role === "admin" && (
                                    <NavLink
                                        href={route("orders.all")}
                                        active={route().current("orders.all")}
                                    >
                                        Orders
                                    </NavLink>
                                )}
                                {user.role === "admin" && (
                                    <NavLink
                                        href={route("categories.list")}
                                        active={route().current("categories.list")}
                                    >
                                        Categories
                                    </NavLink>
                                )}
                                {user.role === "admin" && (
                                    <NavLink
                                        href={route("products.index")}
                                        active={route().current("products.index")}
                                    >
                                        Products
                                    </NavLink>
                                )}
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md border border-zinc-700">
                                            <button
                                                type="button"
                                                className="hover:bg-gray-100 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}

                                                <FontAwesomeIcon
                                                    className="h-4 ms-2"
                                                    icon={faUserShield}
                                                />

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800">
                                {user.name}
                            </div>
                            <div className="font-medium text-sm text-gray-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink
                                href={route("dashboard")}
                                active={route().current("dashboard")}
                            >
                                Dashboard
                            </ResponsiveNavLink>
                            {user.role === "client" && (
                                <ResponsiveNavLink
                                    href={route("shopping-bag.list")}
                                    active={route().current("shopping-bag.list")}
                                >
                                    Shopping Bag
                                </ResponsiveNavLink>
                            )}
                            {user.role === "client" && (
                                <ResponsiveNavLink
                                    href={route("orders.index")}
                                    active={route().current("orders.index")}
                                >
                                    Orders
                                </ResponsiveNavLink>
                            )}
                            {user.role === "admin" && (
                                <ResponsiveNavLink
                                    href={route("orders.all")}
                                    active={route().current("orders.all")}
                                >
                                    Orders
                                </ResponsiveNavLink>
                            )}
                            {user.role === "admin" && (
                                <ResponsiveNavLink
                                    href={route("categories.list")}
                                    active={route().current("categories.list")}
                                >
                                    Categories
                                </ResponsiveNavLink>
                            )}
                            {user.role === "admin" && (
                                <ResponsiveNavLink
                                    href={route("products.index")}
                                    active={route().current("products.index")}
                                >
                                    Products
                                </ResponsiveNavLink>
                            )}
                            <ResponsiveNavLink
                                href={route("profile.edit")}
                                active={route().current("profile.edit")}
                            >
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
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
