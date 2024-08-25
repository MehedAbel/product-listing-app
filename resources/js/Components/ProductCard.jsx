import { Link, router, useForm } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function ProductCard({ product, className = "" }) {
    const { id, name, description, price, category, images } = product;
    // const { delete: deleteProduct } = useForm({});

    // const handleDelete = (e, id) => {
    //     if (confirm("Are you sure you want to delete this product?")) {
    //         deleteProduct(route("products.destroy", [id]), {
    //             onFinish: () => {
    //                 router.reload({ only: ["products"] });
    //             },
    //         });
    //     }
    // };

    return (
        <div
            className={`border border-gray-500 rounded-lg p-4 mt-4 shadow-lg flex flex-col ${className}`}
        >
            {images.length > 0 ? (
                <Swiper
                    modules={[Pagination]}
                    spaceBetween={50}
                    slidesPerView={1}
                    pagination={{
                        clickable: true,
                    }}
                    className="w-full h-56 rounded-lg overflow-hidden"
                >
                    {images.map((image, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <img
                                    src={image.path}
                                    className="object-cover w-full h-full"
                                />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            ) : (
                <div className="w-full h-56 bg-gray-200 rounded-lg flex justify-center items-center font-mono">
                    No Image
                </div>
            )}

            <div className="flex flex-col mt-3">
                <h2 className="truncate font-bold text-lg">{name}</h2>
            </div>
            <div className="flex flex-col">
                <div className="overflow-hidden h-28 border-b border-gray-200">
                    {description}
                </div>
            </div>
            <div className="flex justify-end items-center gap-5 mt-auto pt-3">
                <div className="mr-auto flex flex-col">
                    <div className="text-xl font-semibold">{"€" + price}</div>
                    <div className="text-sm text-blue-600">
                        {category ? "#" + category.name : "#no category"}
                    </div>
                </div>
                <Link
                    href={route("products.show", [id])}
                    className="inline-flex items-center px-4 py-2 bg-zinc-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-zinc-700 active:bg-gray-900 focus:outline-none focus:border-blue-900 focus:ring ring-blue-300 disabled:opacity-25 transition ease-in-out duration-150"
                >
                    View Product
                    <FontAwesomeIcon icon={faEye} className="text-lg ml-2" />
                </Link>
                {/* <Link
                        href={route("products.show", [id])}
                        className="flex items-center"
                    >
                        <FontAwesomeIcon
                            icon={faEye}
                            className="hover:text-blue-500 hover:cursor-pointer hover:scale-125 text-2xl"
                        />
                    </Link>
                    <Link href={route("products.edit", [id])}>
                        <FontAwesomeIcon
                            icon={faPencil}
                            className="hover:text-blue-500 hover:cursor-pointer hover:scale-125"
                        />
                    </Link>
                    <FontAwesomeIcon
                        icon={faTrash}
                        className="hover:text-red-500 hover:cursor-pointer hover:scale-125"
                        onClick={(e) => handleDelete(e, id)}
                    /> */}
            </div>
        </div>
    );
}
