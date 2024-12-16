import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import React, { useMemo } from "react";

export default function Error({ status }) {
    const title = useMemo(() => {
        return {
            404: "page not found",
            403: "Forrbidden",
        }[status] || 'An Error Occurred'
    }, [status]);

    const description = useMemo(() => {
        return {
            404: "the page you are looking for does not exist.",
            403: "tou are not allowed to perform this action.",
        }[status] || 'An Error Occurred'
    }, [status]);
    return (
        <GuestLayout>
            <Head title={title} />
            <div className="mb-4 font-medium text-sm text-red-600">
                {description}
            </div>
        </GuestLayout>
    );
}
