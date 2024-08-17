import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ContentLayout from "@/Layouts/ContentLayout";
import { Head, Link, router } from "@inertiajs/react";
import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function List({ auth, categories }) {
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this category?")) {
            router.delete(route("categories.delete", id));
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Categories" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 flex flex-col">
                            <div className="flex justify-between">
                                <h1 className="font-bold text-2xl">
                                    Categories
                                </h1>
                                <Link
                                    href={route("categories.create")}
                                    className="flex items-center transition ease-in-out duration-100 text-black border border-zinc-700 rounded-xl py-2 px-3 font-bold cursor-pointer tracking-wider border-transparent md:border-2 hover:bg-zinc-700 hover:text-white"
                                >
                                    Create Category
                                </Link>
                            </div>

                            <div className="mt-6">
                                <div className="grid grid-cols-4">
                                    <div className="w-1/4">
                                        <div className="font-bold mb-9">ID</div>
                                    </div>
                                    <div className="w-1/4">
                                        <div className="font-bold mb-9">
                                            Name
                                        </div>
                                    </div>
                                    <div className="w-1/4">
                                        <div className="font-bold mb-9">
                                            Order
                                        </div>{" "}
                                    </div>
                                    <div className="w-1/4">
                                        <div className="font-bold mb-9">
                                            Actions
                                        </div>
                                    </div>

                                    {categories.map((category, index) => {
                                        return (
                                            <Fragment key={index}>
                                                <div className="w-1/4 flex items-center">
                                                    <div className=" mb-2">
                                                        {category.id}
                                                    </div>
                                                </div>
                                                <div className="w-1/4 flex items-center text-nowrap">
                                                    <div className="mb-2 ">
                                                        {category.name}
                                                    </div>
                                                </div>
                                                <div className="w-1/4 flex items-center">
                                                    <div className=" mb-2">
                                                        {category.order}
                                                    </div>
                                                </div>
                                                <div className="w-1/4 flex items-center">
                                                    <div className="mb-2 flex gap-6">
                                                        <Link
                                                            href={route(
                                                                "categories.update",
                                                                [category.id]
                                                            )}
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faPencil}
                                                                className="cursor-pointer hover:text-blue-500 hover:scale-125"
                                                            />
                                                        </Link>
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    category.id
                                                                )
                                                            }
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faTrash}
                                                                className="cursor-pointer hover:text-red-500 hover:scale-125"
                                                            />
                                                        </button>
                                                    </div>
                                                </div>
                                            </Fragment>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
