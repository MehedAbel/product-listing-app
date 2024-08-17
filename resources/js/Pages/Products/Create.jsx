import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ContentLayout from "@/Layouts/ContentLayout";
import { Head, useForm } from "@inertiajs/react";
import ProductForm from "@/Components/ProductForm.jsx";

export default function Create({ auth, categories }) {
    const { data, setData, post, errors, processing } = useForm({
        name: "",
        description: "",
        price: "",
        category_id: "",
        images: [],
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("products.store"));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Create Product" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 flex flex-col gap-5">
                            <h1 className="font-bold text-2xl text-center">
                                Create Product
                            </h1>
                            <div className="mt-3">
                                <ProductForm
                                    data={data}
                                    setData={setData}
                                    errors={errors}
                                    processing={processing}
                                    submit={submit}
                                    categories={categories}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
