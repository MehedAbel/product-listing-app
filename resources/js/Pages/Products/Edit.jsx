import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ContentLayout from "@/Layouts/ContentLayout";
import { Head, useForm } from "@inertiajs/react";
import ProductForm from "@/Components/ProductForm.jsx";

export default function Edit({ auth, product, categories, images }) {
    const { data, setData, post, errors, processing } = useForm({
        name: product.name,
        description: product.description,
        price: product.price,
        category_id: product.category_id ? product.category_id : "",
        new_images: [],
        deleted_images_ids: [],
        _method: "PUT",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("products.update", product.id));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Edit Product" />

            <ContentLayout>
                <h1 className="font-bold text-2xl text-center">Edit Product</h1>
                <div className="mt-3">
                    <ProductForm
                        data={data}
                        setData={setData}
                        errors={errors}
                        processing={processing}
                        submit={submit}
                        categories={categories}
                        images={images}
                        edit={true}
                    />
                </div>
            </ContentLayout>
        </AuthenticatedLayout>
    );
}
