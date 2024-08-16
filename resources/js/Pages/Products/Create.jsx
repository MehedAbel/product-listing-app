import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import SelectField from "@/Components/SelectField.jsx";

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
                            <h1 className="font-bold text-xl">
                                Create Product
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
                                        />
                                        <InputError
                                            message={errors.name}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="description"
                                            value="Description"
                                        />

                                        <TextInput
                                            id="description"
                                            // type="text"
                                            className="mt-1 block w-full"
                                            value={data.description}
                                            onChange={(e) =>
                                                setData(
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.description}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="price"
                                            value="Price"
                                        />

                                        <TextInput
                                            id="price"
                                            type="number"
                                            className="mt-1 block w-full"
                                            value={data.price}
                                            onChange={(e) =>
                                                setData("price", e.target.value)
                                            }
                                        />
                                        <InputError
                                            message={errors.price}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="category_id"
                                            value="Category"
                                            className="mb-1"
                                        />

                                        <SelectField
                                            id="category_id"
                                            onChange={(e) =>
                                                setData(
                                                    "category_id",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">
                                                - Select Category -
                                            </option>
                                            {categories.map(
                                                (category, index) => {
                                                    return (
                                                        <option
                                                            key={index}
                                                            value={category.id}
                                                        >
                                                            {category.name}
                                                        </option>
                                                    );
                                                }
                                            )}
                                        </SelectField>

                                        <InputError
                                            message={errors.category_id}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="images"
                                            value="Images"
                                        />

                                        <input
                                            type="file"
                                            id="images"
                                            className="mt-1 block w-full"
                                            multiple
                                            onChange={(e) => {
                                                setData(
                                                    "images",
                                                    e.target.files
                                                );
                                            }}
                                        />
                                        <InputError
                                            message={errors.images}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="flex items-center justify-end mt-4">
                                        <PrimaryButton
                                            className="ml-4"
                                            disabled={processing}
                                        >
                                            Create
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
