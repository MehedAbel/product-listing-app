import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ContentLayout from "@/Layouts/ContentLayout";
import { Head, useForm, usePage, router, Link } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

export default function List({ user, products }) {
    console.log(products);
    const { flash } = usePage().props;

    const { delete: del, data, setData } = useForm({});

    const handleDelete = (product_id) => { 
        console.log(`The ID is: ${product_id}`);
    
        del(route("shopping-bag.remove", { id: product_id }), {
            preserveScroll: true,
            onSuccess: (response) => console.log("Success!"),
            onError: (errors) => console.error(errors),
        });
    };

    return (
        <AuthenticatedLayout user={user}>
            <Head title="Shopping Bag" />

            <ContentLayout>
                <h1 className="font-bold text-2xl text-center">Shopping Bag</h1>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-44">Make Order</button>
                {products.length > 0 ? (
                    <ul className="mt-3">
                        {products.map(product => (
                            <li key={product.id} className="border p-2 flex justify-between items-center">
                                <div>
                                    <p className="font-bold">{product.product.name}</p>
                                    <p><b>EUR</b> {product.product.price}</p>
                                </div>
                                <div className="flex">
                                    <Link
                                        href={route("products.show", [
                                            product.id,
                                        ])}
                                        className="flex items-center mr-5"
                                    >
                                        <FontAwesomeIcon
                                            icon={faEye}
                                            className="hover:text-blue-500 cursor-pointer hover:scale-125"
                                        />
                                    </Link>
                                    <button onClick={() => handleDelete(product.id)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Remove</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center">Your shopping bag is empty</p>
                )}
            </ContentLayout>
        </AuthenticatedLayout>
    );
}
