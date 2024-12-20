import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ContentLayout from "@/Layouts/ContentLayout";
import { Head, Link } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

export default function Index({ user, orders }) {
    return (
        <AuthenticatedLayout user={user}>
            <Head title="Orders" />

            <ContentLayout>
                <h1 className="font-bold text-2xl text-center mb-5">Orders</h1>
                {orders.length > 0 ? (
                    orders.map(order => (
                        <div key={order.id} className="border-4 p-3 mb-3 flex flex-col gap-1">
                            <h2 className="text-xl">Order ID: {order.id}</h2>
                            <p>Total Price: EUR {order.total_price}</p>
                            <p>Address: {order.address}</p>
                            <p>Phone Number: {order.phone_number}</p>
                            <p>Order Date: {order.created_at}</p>
                            <div>
                                <h2 className="text-xl">Products</h2>
                                <ul>
                                    {order.products.map(product => (
                                        <li key={product.id} className="border p-2 flex justify-between">
                                            <div>
                                                <p>Name: {product.name}</p>
                                                <p>Price: EUR {product.price}</p>
                                            </div>
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
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No orders found.</p>
                )}
            </ContentLayout>
        </AuthenticatedLayout>
    );
}
