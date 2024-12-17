import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ContentLayout from "@/Layouts/ContentLayout";
import { Head, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import { Transition } from "@headlessui/react";

export default function AddEdit({ category, user }) {
    const { data, setData, post, errors, processing } = useForm({
        name: category?.name || "",
        order: category?.order || "",
    });

    const submit = (e) => {
        e.preventDefault();

        let categoryRoute = category
            ? route("categories.store", [category.id])
            : route("categories.store");
        post(categoryRoute);
    };

    return (
        <AuthenticatedLayout user={user}>
            <Head title="Add Edit Category" />

            <ContentLayout>
                <h1 className="font-bold text-2xl text-center">
                    Add or Edit Category
                </h1>
                <div className="mt-3">
                    <form onSubmit={submit} className="mt-6 space-y-6">
                        <div>
                            <InputLabel htmlFor="name" value="Name" />

                            <TextInput
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                                isFocused
                            />

                            <InputError
                                className="mt-2"
                                message={errors.name}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="order" value="Order" />

                            <TextInput
                                id="order"
                                type="number"
                                className="mt-1 block w-full"
                                value={data.order}
                                onChange={(e) =>
                                    setData("order", e.target.value)
                                }
                                required
                            />

                            <InputError
                                className="mt-2"
                                message={errors.order}
                            />
                        </div>

                        <div className="flex justify-end items-center gap-4">
                            <PrimaryButton disabled={processing}>
                                Save
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </ContentLayout>
        </AuthenticatedLayout>
    );
}
