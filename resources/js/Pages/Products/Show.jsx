import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ContentLayout from "@/Layouts/ContentLayout";
import { Head } from "@inertiajs/react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Zoom } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

export default function Show({ auth, product, category, images }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Show Product" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 flex flex-col gap-5">
                            <h1 className="font-bold text-2xl text-center">
                                Show Product
                            </h1>
                            <div className="mt-3 flex flex-col items-center justify-center gap-5">
                                {images.length > 0 ? (
                                    <Swiper
                                        modules={[Pagination, Zoom]}
                                        spaceBetween={50}
                                        slidesPerView={1}
                                        pagination={{
                                            clickable: true,
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
                                                            src={
                                                                "/storage/" +
                                                                image.path
                                                            }
                                                            className="object-contain max-h-full max-w-full"
                                                        />
                                                    </div>
                                                </SwiperSlide>
                                            );
                                        })}
                                    </Swiper>
                                ) : (
                                    <div className="w-full max-w-3xl h-96 bg-gray-200 rounded-lg flex justify-center items-center font-mono">
                                        No Image
                                    </div>
                                )}
                                <div className="flex justify-between w-full flex-col sm:flex-row">
                                    <div className="font-semibold text-xl">
                                        {product.name}
                                    </div>
                                    <div className="font-bold text-2xl  ">
                                        {"€" + product.price}
                                    </div>
                                </div>
                                <div className="flex justify-start w-full text-lg">
                                    {product.description}
                                </div>
                                <div className="flex justify-start w-full text-md text-blue-600">
                                    {category
                                        ? "#" + category.name
                                        : "#no category"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
