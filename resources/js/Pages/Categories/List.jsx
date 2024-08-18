import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ContentLayout from "@/Layouts/ContentLayout";
import { Head, Link } from "@inertiajs/react";
import CategoriesTable from "@/Components/CategoriesTable";

export default function List({ auth, categories }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Categories" />

            <ContentLayout>
                <div className="flex justify-between items-center">
                    <h1 className="font-bold text-2xl">Categories</h1>
                    <Link
                        href={route("categories.create")}
                        className="flex items-center transition ease-in-out duration-100 text-black border border-zinc-700 rounded-xl py-2 px-3 font-bold cursor-pointer tracking-wider border-transparent hover:bg-zinc-700 hover:text-white"
                    >
                        Create Category
                    </Link>
                </div>

                <div className="mt-6">
                    <CategoriesTable categories={categories} />
                </div>
            </ContentLayout>
        </AuthenticatedLayout>
    );
}
