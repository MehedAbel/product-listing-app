import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ContentLayout from "@/Layouts/ContentLayout";
import { Head } from "@inertiajs/react";
import ImageGallery from "@/Components/ImageGallery";

export default function Show({ auth, product, category, images }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Show Product" />

            <ContentLayout>
                <h1 className="font-bold text-2xl text-center">Show Product</h1>
                <div className="mt-3 flex flex-col items-center justify-center gap-5">
                    <ImageGallery images={images} />
                    <div className="flex justify-between w-full flex-col">
                        <h2 className=" text-4xl">{product.name}</h2>
                        <div className="font-bold text-4xl mt-5">
                            {"€" + product.price}
                        </div>
                    </div>
                    <div className="bg-zinc-700 h-px w-full"></div>
                    <div className="flex justify-start w-full text-lg flex-col gap-5">
                        <h2 className="font-semibold text-2xl">DESCRIPTION</h2>
                        <div>{product.description}</div>
                    </div>
                    <div className="flex justify-start w-full text-md text-blue-600">
                        {category ? "#" + category.name : "#no category"}
                    </div>
                </div>
            </ContentLayout>
        </AuthenticatedLayout>
    );
}
