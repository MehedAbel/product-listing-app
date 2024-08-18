import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ContentLayout from "@/Layouts/ContentLayout";
import { Head, Link } from "@inertiajs/react";
import PaginationLinks from "@/Components/PaginationLinks";
import ProductCard from "@/Components/ProductCard";

export default function List({ auth, paginated }) {
    const products = paginated.data;

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Products" />

            <ContentLayout>
                <div className="flex justify-between items-center">
                    <h1 className="font-bold text-2xl">Products</h1>
                    <Link
                        href={route("products.create")}
                        className="flex items-center transition ease-in-out duration-100 text-black border border-zinc-700 rounded-xl py-2 px-3 font-bold cursor-pointer tracking-wider border-transparent hover:bg-zinc-700 hover:text-white"
                    >
                        Create Product
                    </Link>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {products.map((product, index) => {
                        return <ProductCard product={product} key={index} />;
                    })}
                </div>
                <PaginationLinks links={paginated.links} />
            </ContentLayout>
        </AuthenticatedLayout>
    );
}
