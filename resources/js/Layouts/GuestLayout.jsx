import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
    return (
        <div
            className="min-h-screen flex justify-center md:justify-end items-center bg-gray-100 bg-cover bg-center"
            style={{ backgroundImage: "url(/images/black-n-white-peak.jpg)" }}
        >
            <div className="flex flex-col items-center w-full sm:max-w-md p-2 gap-5 md:mr-40">
                <div>
                    <Link href="/">
                        <ApplicationLogo className="w-20 h-20 fill-current text-black" />
                    </Link>
                </div>
                <div className="w-full px-6 py-4 bg-white shadow-md overflow-hidden rounded-lg">
                    {children}
                </div>
            </div>
        </div>
    );
}
