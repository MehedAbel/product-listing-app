import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import SelectField from "@/Components/SelectField.jsx";
import Textarea from "@/Components/Textarea.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function ProductForm({
    data,
    setData,
    errors,
    processing,
    submit,
    categories,
    images,
    edit = false,
}) {
    return (
        <form onSubmit={submit} className="mt-6 space-y-6">
            <div>
                <InputLabel htmlFor="name" value="Name" />

                <TextInput
                    id="name"
                    className="mt-1 block w-full"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                />
                <InputError message={errors.name} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="description" value="Description" />

                <Textarea
                    id="description"
                    rows="8"
                    className="mt-1 block w-full"
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                />
                <InputError message={errors.description} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="price" value="Price (EUR)" />

                <TextInput
                    id="price"
                    type="number"
                    className="mt-1 block w-full"
                    value={data.price}
                    onChange={(e) => setData("price", e.target.value)}
                />
                <InputError message={errors.price} className="mt-2" />
            </div>

            <div>
                <InputLabel
                    htmlFor="category_id"
                    value="Category"
                    className="mb-1"
                />

                <SelectField
                    id="category_id"
                    onChange={(e) => setData("category_id", e.target.value)}
                    value={data.category_id}
                >
                    <option value="">- Select Category -</option>
                    {categories.map((category, index) => {
                        return (
                            <option key={index} value={category.id}>
                                {category.name}
                            </option>
                        );
                    })}
                </SelectField>
                <InputError message={errors.category_id} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="images" value="Add Images" />
                <input
                    type="file"
                    id="images"
                    className="mt-1 block w-full "
                    multiple
                    onChange={(e) => {
                        setData(edit ? "new_images" : "images", e.target.files);
                    }}
                />
                <InputError message={errors.new_images} className="mt-2" />
            </div>

            <div className="gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {edit &&
                    images.map((image, index) => {
                        return (
                            <div
                                className="border border-transparent overflow-hidden rounded-lg relative hover:scale-105 transform transition ease-in-out duration-100"
                                key={index}
                            >
                                <img
                                    src={image.path}
                                    className="object-cover w-full h-full"
                                />
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setData("deleted_images_ids", [
                                            ...data.deleted_images_ids,
                                            image.id,
                                        ]);

                                        e.target.parentElement.parentElement.parentElement.remove();
                                    }}
                                >
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        className="cursor-pointer absolute bottom-5 right-5 text-red-500 hover:scale-125"
                                    />
                                </button>
                            </div>
                        );
                    })}
            </div>

            <div className="flex items-center justify-end mt-4">
                <PrimaryButton className="ml-4" disabled={processing}>
                    {edit ? "Edit" : "Create"}
                </PrimaryButton>
            </div>
        </form>
    );
}
