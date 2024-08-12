import { Link } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none " +
                (active
                    ? "border-zinc-800 text-gray-900 focus:border-indigo-700 dark:text-white dark:border-amber-800"
                    : "border-transparent text-gray-500 dark:hover:text-white hover:text-gray-800 hover:border-red-500 focus:border-amber-800") +
                className
            }
        >
            {children}
        </Link>
    );
}
