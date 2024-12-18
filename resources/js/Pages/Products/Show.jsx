import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import GuestLayout from "@/Layouts/GuestLayout";
import ContentLayout from "@/Layouts/ContentLayout";
import ImageGallery from "@/Components/ImageGallery";
import UnAuthenticatedLayout from "@/Layouts/UnAuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";

export default function Show({ user, product, category, images, product_owner }) {
    const isAuthenticated = Boolean(user);
    const Layout = isAuthenticated ? AuthenticatedLayout : UnAuthenticatedLayout;

    const { post, data, setData  } = useForm({
        product_id: product.id
    });

    const { flash } = usePage().props;

    const addProduct = () => { 
        post(route("shopping-bag.add"));
    };

    return (
        <>
        <Layout user={user}>
            <Head title="Show Product" />

            <ContentLayout>
                <div className="mt-3 flex flex-col items-center justify-center gap-5">
                    <ImageGallery images={images} />
                    {user?.role === "client" && (
                        <div className="flex justify-start w-full">
                            <button onClick={addProduct} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add To Shopping Bag</button>
                        </div>
                    )}
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
                    <div className="flex justify-start w-full text-md">
                        <b>Contact:{`\xa0`}</b> 
                        <a className="italic text-blue-600 underline" href={"mailto:" + product_owner.email}>{product_owner.email}</a>
                    </div>
                    <div className="flex justify-start w-full text-md text-blue-600">
                        {category ? "#" + category.name : "#no category"}
                    </div>
                </div>
            </ContentLayout>
        </Layout>
        </>
    );
}
