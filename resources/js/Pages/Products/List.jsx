import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ContentLayout from "@/Layouts/ContentLayout";
import { Head, Link, router } from "@inertiajs/react";
import PaginationLinks from "@/Components/PaginationLinks";
import ProductCard from "@/Components/ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";

export default function List({ auth, paginated, categories, queryParameters }) {
    const products = paginated.data;

    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState(
        queryParameters.categories ? queryParameters.categories.split("_") : []
    );

    const [search, setSearch] = useState(queryParameters.search || "");

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Products" />

            <Modal
                show={isOpen}
                onClose={() => {
                    setIsOpen(false);
                }}
            >
                <div className="flex flex-col py-4 px-5">
                    <h2 className="text-xl font-semibold text-center">
                        Choose categories
                    </h2>
                    <div className="flex gap-5 flex-wrap mt-5">
                        {categories.map((category, index) => {
                            const isSelected = selectedCategories.includes(
                                category.id.toString()
                            );

                            return (
                                <div
                                    key={index}
                                    className={`inline-flex items-center px-3 py-1 text-sm leading-4 font-medium cursor-pointer rounded-md border ${
                                        isSelected
                                            ? "border-blue-400 hover:bg-blue-500 text-white bg-blue-400 hover:text-gray-100"
                                            : "border-zinc-700 hover:bg-gray-100 text-gray-500 bg-white hover:text-gray-700"
                                    } focus:outline-none transition ease-in-out duration-150`}
                                    onClick={() => {
                                        if (isSelected) {
                                            setSelectedCategories(
                                                selectedCategories.filter(
                                                    (id) =>
                                                        id !==
                                                        category.id.toString()
                                                )
                                            );
                                        } else {
                                            setSelectedCategories([
                                                ...selectedCategories,
                                                category.id.toString(),
                                            ]);
                                        }
                                    }}
                                >
                                    <div>{category.name}</div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="mt-5 flex  justify-between gap-2">
                        <PrimaryButton
                            onClick={() => {
                                setIsOpen(false);
                                setSelectedCategories(
                                    queryParameters.categories
                                        ? queryParameters.categories.split("_")
                                        : []
                                );
                            }}
                            className=""
                        >
                            Cancel
                        </PrimaryButton>
                        <Link
                            href={route("products.index", {
                                categories: "",
                                search: search,
                            })}
                            className="inline-flex items-center px-4 py-2 bg-zinc-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-zinc-700 active:bg-gray-900 focus:outline-none focus:border-blue-900 focus:ring ring-blue-300 disabled:opacity-25 transition ease-in-out duration-150"
                        >
                            Remove Filters
                        </Link>
                        <Link
                            href={route("products.index", {
                                categories: selectedCategories.join("_"),
                                search: search,
                            })}
                            className="inline-flex items-center px-4 py-2 bg-zinc-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-zinc-700 active:bg-gray-900 focus:outline-none focus:border-blue-900 focus:ring ring-blue-300 disabled:opacity-25 transition ease-in-out duration-150"
                        >
                            Apply Filters
                        </Link>
                    </div>
                </div>
            </Modal>

            <ContentLayout>
                <div className="flex justify-between items-center">
                    <h1 className="font-bold text-2xl">Products</h1>
                    <Link
                        href={route("products.create")}
                        className="flex items-center transition ease-in-out duration-100 text-black border border-zinc-700 rounded-lg py-2 px-3 font-bold cursor-pointer tracking-wider border-transparent hover:bg-zinc-700 hover:text-white"
                    >
                        Create Product
                    </Link>
                </div>
                <div className="mt-2 flex flex-col justify-center items-center gap-2">
                    <TextInput
                        type="search"
                        name="search"
                        placeholder="Search products..."
                        className="max-w-xl w-full"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <PrimaryButton
                        className="ml-2"
                        onClick={() => {
                            router.get(
                                route(
                                    "products.index",
                                    {
                                        search: search,
                                        categories: queryParameters.categories,
                                    },
                                    {
                                        only: ["paginated"],
                                        preserveState: true,
                                        preserveScroll: true,
                                    }
                                )
                            );
                        }}
                    >
                        Search
                    </PrimaryButton>
                </div>
                <div className="mt-4 flex items-center justify-center">
                    <div
                        onClick={() => setIsOpen(!isOpen)}
                        className="cursor-pointer gap-2 rounded-md border border-zinc-700 hover:bg-gray-100 inline-flex items-center px-3 py-1 text-sm leading-4 font-medium text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                    >
                        <FontAwesomeIcon
                            icon={faFilter}
                            className="text-zinc-800 text-lg"
                        />
                        <h2 className="text-lg">Filter Category</h2>
                    </div>
                </div>

                {products.length > 0 ? (
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {products.map((product, index) => {
                            return (
                                <ProductCard product={product} key={index} />
                            );
                        })}
                    </div>
                ) : (
                    <h2 className="mt-6 flex justify-center items-center font-semibold text-2xl">
                        No Products Here
                    </h2>
                )}

                {paginated.links.length > 0 && (
                    <PaginationLinks links={paginated.links} />
                )}
            </ContentLayout>
        </AuthenticatedLayout>
    );
}
