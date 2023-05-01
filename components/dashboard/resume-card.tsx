"use client"

import { ReactNode, useState } from "react";
import { Copy, Download, Edit, Trash } from "lucide-react";
import { Loader } from "lucide-react"; // Import the Loader component
import { useRouter } from "next/navigation";

export default function ResumeCard({
    title,
    id,
}: {
    title: string;
    id: string;
}) {

    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    // handle delete function 
    const handleDelete = async (id: string) => {
        setIsDeleting(true); // Set isDeleting state to true
        const res = await fetch(`http://localhost:3000/api/resume/${id}`, {
            method: "DELETE",
        });
        setIsDeleting(false); // Set isDeleting state back to false
        router.refresh();
    };


    return (
        <div className="flex pr-8 mb-10 animate-fade-up " style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}>
            <div className="border-2 w-52 h-72 bg-white rounded-md hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1 transition-all cursor-pointer"></div>
            <div className="p-6">
                <h3 className=" text-3xl font-medium">{title}</h3><br />
                <button className="flex mb-5">
                    <Edit className="p-1 mr-2"/>
                    <p>Edit</p>
                </button>
                <button className="flex mb-5">
                    <Copy className="p-1 mr-2"/>
                    <p>Duplicate</p>
                </button>
                <button className="flex mb-5" onClick={() => handleDelete(id)}>
                    {isDeleting ? (
                        <Loader className="p-1 mr-2 animate-spin" />
                    ) : (
                        <Trash className="p-1 mr-2" />
                    )}
                    <p>Delete</p>
                </button>
                <button className="flex text-blue-600">
                    <Download className="p-1 mr-2" />
                    <p>Download</p>
                </button>

            </div>
        </div>
    );
}

