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
import logo from "/public/images/app-logo.svg";

export default function Welcome({
    auth,
    paginated,
    categories,
    queryParameters,
}) {
    const products = paginated.data;

    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState(
        queryParameters.categories ? queryParameters.categories.split("_") : []
    );

    const [search, setSearch] = useState(queryParameters.search || "");

    return (
        <>
            <Head title="Welcome" />
            <div className="flex flex-col w-full min-h-screen">
                <header className="flex justify-center items-center py-7 px-6 bg-gray-100">
                    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        <div className="flex justify-center items-center">
                            <img
                                src={logo}
                                alt="App Logo"
                                className="hidden sm:block sm:h-20 mr-4"
                            />
                            <h1 className="text-md sxs:text-lg xs:text-xl sm:text-2xl text-zinc-800 font-bold">
                                John's Magic Emporium
                            </h1>
                        </div>
                        <nav className="flex flex-1 justify-end items-center gap-2 px-2 m-0">
                            {auth.user && (
                                <Link
                                    href={route("dashboard")}
                                    className="flex items-center transition ease-in-out duration-100 text-black border border-zinc-700 rounded-lg py-2 px-3 font-bold cursor-pointer tracking-wider border-transparent hover:bg-zinc-700 hover:text-white"
                                >
                                    Dashboard
                                </Link>
                            )}
                        </nav>
                    </div>
                </header>

                <main className="px-6 flex flex-1 bg-gradient-to-b from-gray-100 to-gray-200">
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
                                    const isSelected =
                                        selectedCategories.includes(
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
                                                ? queryParameters.categories.split(
                                                      "_"
                                                  )
                                                : []
                                        );
                                    }}
                                    className=""
                                >
                                    Cancel
                                </PrimaryButton>
                                <Link
                                    href={route("home", {
                                        categories: "",
                                        search: search,
                                    })}
                                    className="inline-flex items-center px-4 py-2 bg-zinc-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-zinc-700 active:bg-gray-900 focus:outline-none focus:border-blue-900 focus:ring ring-blue-300 disabled:opacity-25 transition ease-in-out duration-150"
                                >
                                    Remove Filters
                                </Link>
                                <Link
                                    href={route("home", {
                                        categories:
                                            selectedCategories.join("_"),
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
                                className=""
                                onClick={() => {
                                    router.get(
                                        route(
                                            "home",
                                            {
                                                search: search,
                                                categories:
                                                    queryParameters.categories,
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
                                <div className="text-lg">Filter Category</div>
                            </div>
                        </div>

                        {products.length > 0 ? (
                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                {products.map((product, index) => {
                                    return (
                                        <ProductCard
                                            product={product}
                                            key={index}
                                        />
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
                </main>

                <footer className="flex justify-center items-center bg-black py-2 px-2 h-20">
                    <p className="text-white">
                        Copyright © {new Date().getFullYear()} Some Dev. All
                        rights reserved.
                    </p>
                </footer>
            </div>
        </>
    );
}
