import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import { Transition } from "@headlessui/react";

export default function AddEdit({ category, auth }) {
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
        <AuthenticatedLayout user={auth.user}>
            <Head title="Add Edit Category" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 flex flex-col gap-5">
                            <h1 className="font-bold text-xl text-center">
                                Add or Edit Category
                            </h1>
                            <div className="mt-3">
                                <form
                                    onSubmit={submit}
                                    className="mt-6 space-y-6"
                                >
                                    <div>
                                        <InputLabel
                                            htmlFor="name"
                                            value="Name"
                                        />

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
                                        <InputLabel
                                            htmlFor="order"
                                            value="Order"
                                        />

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

                                    <div className="flex items-center gap-4">
                                        <PrimaryButton disabled={processing}>
                                            Save
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
