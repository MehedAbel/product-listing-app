import { Link } from "@inertiajs/react";

export default function PaginationLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`mx-1 px-3 py-2 rounded-lg ${
                active
                    ? "bg-zinc-700 text-white font-semibold hover:bg-zinc-800"
                    : "bg-gray-200 text-gray-900 hover:bg-gray-300"
            } ${className}`}
        >
            {children}
        </Link>
    );
}
