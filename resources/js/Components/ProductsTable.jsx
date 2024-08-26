import { Link, router, useForm } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";

export default function ProductsTable({ products }) {
    const { delete: deleteProduct } = useForm({});

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this product?")) {
            deleteProduct(route("products.destroy", id), {
                onFinish: () => {
                    router.reload({ only: ["products"] });
                },
            });
        }
    };

    const truncate = (str, len) => {
        if (str.length > len) {
            return str.substring(0, len) + "...";
        }

        return str;
    };

    return (
        <div className="overflow-x-scroll mt-12">
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
                            <h2>Description</h2>
                        </th>
                        <th className="font-bold p-2">
                            <h2>Category</h2>
                        </th>
                        <th className="font-bold p-2">
                            <h2>Price</h2>
                        </th>
                        <th className="font-bold p-2">
                            <h2>Actions</h2>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => {
                        return (
                            <tr
                                key={index}
                                className="even:bg-white odd:bg-gray-100 w-full"
                            >
                                <td className="py-3 px-4 text-center">
                                    <div className="">{product.id}</div>
                                </td>
                                <td className="py-3 px-4 text-center">
                                    <div className="">{product.name}</div>
                                </td>
                                <td className="py-3 px-4 text-center">
                                    <div className="">
                                        {truncate(product.description, 255)}
                                    </div>
                                </td>
                                <td className="py-3 px-4 text-center">
                                    <div className="">
                                        {product?.category?.name ?? "NULL"}
                                    </div>
                                </td>
                                <td className="py-3 px-4 text-center">
                                    <div className="">
                                        {"€" + product.price}
                                    </div>
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex gap-6 justify-center items-center">
                                        <Link
                                            href={route("products.show", [
                                                product.id,
                                            ])}
                                            className="flex items-center"
                                        >
                                            <FontAwesomeIcon
                                                icon={faEye}
                                                className="hover:text-blue-500 cursor-pointer hover:scale-125"
                                            />
                                        </Link>
                                        <Link
                                            href={route("products.edit", [
                                                product.id,
                                            ])}
                                        >
                                            <FontAwesomeIcon
                                                icon={faPencil}
                                                className="cursor-pointer hover:text-blue-500 hover:scale-125"
                                            />
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDelete(product.id)
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
        </div>
    );
}
