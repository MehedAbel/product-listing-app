import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ContentLayout from "@/Layouts/ContentLayout";
import { Head } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Zoom, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";

export default function Show({ auth, product, category, images }) {
    const [isEnd, setIsEnd] = useState({
        left: true,
        right: true,
    });

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Show Product" />

            <ContentLayout>
                <h1 className="font-bold text-2xl text-center">Show Product</h1>
                <div className="mt-3 flex flex-col items-center justify-center gap-5">
                    <div className="w-full flex justify-center items-center">
                        {images.length > 0 ? (
                            <>
                                <div
                                    className={`hidden sm:block custom-swiper-button-prev cursor-pointer text-4xl px-4 py-2 rounded-lg z-50 bg-gray-100 mx-5 ${
                                        isEnd.left
                                            ? "text-zinc-400"
                                            : "text-zinc-800"
                                    }`}
                                >
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                </div>
                                <Swiper
                                    modules={[Pagination, Zoom, Navigation]}
                                    spaceBetween={50}
                                    slidesPerView={1}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    navigation={{
                                        prevEl: ".custom-swiper-button-prev",
                                        nextEl: ".custom-swiper-button-next",
                                    }}
                                    onSlideChange={(swiper) => {
                                        setIsEnd({
                                            left: swiper.isBeginning,
                                            right: swiper.isEnd,
                                        });
                                    }}
                                    onInit={(swiper) => {
                                        setIsEnd({
                                            left: swiper.isBeginning,
                                            right: swiper.isEnd,
                                        });
                                    }}
                                    zoom={true}
                                    className="w-full max-w-3xl aspect-square rounded-lg overflow-hidden"
                                >
                                    {images.map((image, index) => {
                                        return (
                                            <SwiperSlide
                                                key={index}
                                                className="h-full w-full bg-gray-200 flex justify-center items-center"
                                            >
                                                <div className="swiper-zoom-container h-full w-full flex justify-center items-center">
                                                    <img
                                                        src={image.path}
                                                        className="object-contain max-h-full max-w-full"
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        );
                                    })}
                                </Swiper>
                                <div
                                    className={`hidden sm:block custom-swiper-button-next cursor-pointer text-4xl px-4 py-2 rounded-lg z-50 bg-gray-100 mx-5 ${
                                        isEnd.right
                                            ? "text-zinc-400"
                                            : "text-zinc-800"
                                    }`}
                                >
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </div>
                            </>
                        ) : (
                            <div className="w-full max-w-3xl h-96 bg-gray-200 rounded-lg flex justify-center items-center font-mono">
                                No Image
                            </div>
                        )}
                    </div>
                    <div className="flex justify-between w-full flex-col sm:flex-row">
                        <h2 className="font-semibold text-xl">
                            {product.name}
                        </h2>
                        <div className="font-bold text-2xl  ">
                            {"€" + product.price}
                        </div>
                    </div>
                    <div className="flex justify-start w-full text-lg">
                        {product.description}
                    </div>
                    <div className="flex justify-start w-full text-md text-blue-600">
                        {category ? "#" + category.name : "#no category"}
                    </div>
                </div>
            </ContentLayout>
        </AuthenticatedLayout>
    );
}
