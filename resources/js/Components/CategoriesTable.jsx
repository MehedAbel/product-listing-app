import { Link, router } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function CategoriesTable({ categories }) {
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this category?")) {
            router.delete(route("categories.delete", id));
        }
    };

    return (
        <table className="w-full">
            <thead>
                <tr className="w-full">
                    <th className="font-bold p-2">
                        <h2>ID</h2>
                    </th>
                    <th className="font-bold p-2">
                        <h2>Name</h2>
                    </th>
                    <th className="font-bold p-2">
                        <h2>Order</h2>
                    </th>
                    <th className="font-bold p-2">
                        <h2>Actions</h2>
                    </th>
                </tr>
            </thead>
            <tbody>
                {categories.map((category, index) => {
                    return (
                        <tr
                            key={index}
                            className="even:bg-white odd:bg-gray-100 w-full"
                        >
                            <td className="py-3 px-4 text-center w-1/4">
                                <div className="">{category.id}</div>
                            </td>
                            <td className="py-3 px-4 text-center w-1/4">
                                <div className="">{category.name}</div>
                            </td>
                            <td className="py-3 px-4 text-center w-1/4">
                                <div className="">{category.order}</div>
                            </td>
                            <td className="py-3 px-4 w-1/4">
                                <div className="flex gap-6 justify-center items-center">
                                    <Link
                                        href={route("categories.update", [
                                            category.id,
                                        ])}
                                    >
                                        <FontAwesomeIcon
                                            icon={faPencil}
                                            className="cursor-pointer hover:text-blue-500 hover:scale-125"
                                        />
                                    </Link>
                                    <button
                                        onClick={() =>
                                            handleDelete(category.id)
                                        }
                                    >
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            className="cursor-pointer hover:text-red-500 hover:scale-125"
                                        />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
