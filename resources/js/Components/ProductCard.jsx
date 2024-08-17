import { Link, router } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function ProductCard({ product, className = "" }) {
    const { id, name, description, price, category, images } = product;
    const handleDelete = (e, id) => {
        e.preventDefault();
        if (confirm("Are you sure you want to delete this product?")) {
            router.delete(route("products.destroy", id));
        }
    };

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
                                    src={"/storage/" + image.path}
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
                <div className="truncate font-bold text-lg">{name}</div>
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
                <Link href={route("products.show", [id])}>
                    <FontAwesomeIcon
                        icon={faEye}
                        className="hover:text-blue-500 hover:cursor-pointer hover:scale-125"
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
                />
            </div>
        </div>
    );
}