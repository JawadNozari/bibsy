"use client";
import { useRouter } from "next/navigation";

const ReRoute = () => {
    //! This is a re-route component that is used to re-route to the allbooks page when the user tries to access the bookDetails page
    const router = useRouter();
    router.push("/home/allbooks");
};

export default ReRoute;
