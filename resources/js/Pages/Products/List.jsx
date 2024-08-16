import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

export default function List({ auth, products }) {
    // const handleDelete = (id) => {
    //     if (confirm("Are you sure you want to delete this category?")) {
    //         router.delete(route("categories.delete", id));
    //     }
    // };

    console.log(products);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Product List" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 flex flex-col">
                            <div className="flex justify-between">
                                <h1 className="font-bold text-xl">
                                    Product List
                                </h1>
                                <Link
                                    href={route("products.create")}
                                    className="flex items-center transition ease-in-out duration-100 text-black border border-zinc-700 rounded-xl py-2 px-3 font-bold cursor-pointer tracking-wider border-transparent md:border-2 hover:bg-zinc-700 hover:text-white"
                                >
                                    Create Product
                                </Link>
                            </div>

                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                {products.map((product, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="border border-gray-500 rounded-lg p-4 mt-4 shadow-lg flex flex-col"
                                        >
                                            {product.images.length > 0 && (
                                                <Swiper
                                                    modules={[Pagination]}
                                                    spaceBetween={50}
                                                    slidesPerView={1}
                                                    pagination={{
                                                        clickable: true,
                                                    }}
                                                    className="w-full h-48 rounded-lg overflow-hidden"
                                                >
                                                    {product.images.map(
                                                        (image, index) => {
                                                            return (
                                                                <SwiperSlide
                                                                    key={index}
                                                                >
                                                                    <img
                                                                        src={
                                                                            "/storage/" +
                                                                            image.path
                                                                        }
                                                                        className="object-cover w-full h-full"
                                                                    />
                                                                </SwiperSlide>
                                                            );
                                                        }
                                                    )}
                                                </Swiper>
                                            )}
                                            <div className="flex flex-col mt-3">
                                                <div className="font-bold text-lg">
                                                    Name:{" "}
                                                </div>
                                                <div>{product.name}</div>
                                            </div>
                                            <div className="flex flex-col">
                                                <div className="font-bold text-lg">
                                                    Description:{" "}
                                                </div>
                                                <div>{product.description}</div>
                                            </div>
                                            <div className="flex flex-col">
                                                <div className="font-bold text-lg">
                                                    Price:{" "}
                                                </div>
                                                <div>{product.price}</div>
                                            </div>
                                            <div className="flex flex-col">
                                                <div className="font-bold text-lg">
                                                    Category:{" "}
                                                </div>
                                                <div>
                                                    {product.category
                                                        ? product.category.name
                                                        : "None"}
                                                </div>
                                            </div>
                                            <div className="flex justify-end items-center gap-5 mt-auto">
                                                <Link
                                                    href={route(
                                                        "products.show",
                                                        [product.id]
                                                    )}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faEye}
                                                        className="hover:text-blue-500 hover:cursor-pointer hover:scale-125"
                                                    />
                                                </Link>
                                                <Link
                                                    href={route(
                                                        "products.edit",
                                                        [product.id]
                                                    )}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faPencil}
                                                        className="hover:text-blue-500 hover:cursor-pointer hover:scale-125"
                                                    />
                                                </Link>
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                    className="hover:text-red-500 hover:cursor-pointer hover:scale-125"
                                                    // onClick={() =>
                                                    //     handleDelete(category.id)
                                                    // }
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
