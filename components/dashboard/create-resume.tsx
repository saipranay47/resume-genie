// components/CreateResumeButton.tsx
"use client"
import { Loader, Plus } from 'lucide-react';
import React from 'react';
import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
import { useRouter } from "next/navigation"

// interface CreateResumeButtonProps {
//     userId: string;
// }

interface CreateResumeButton extends ButtonProps { }


export function CreateResumeButton({
    className,
    variant,
    ...props
}: CreateResumeButton) {

    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const router = useRouter()

    async function onClick() {
        setIsLoading(true)
        

        const response = await fetch('/api/resume', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: 'Untitled Resume'}),
            });

            if (response.ok) {
                const newResume = await response.json();
                console.log('New resume created:', newResume);
                router.refresh()
                router.push(`/dashboard/editor/${newResume.id}`)
                // Perform any additional actions required after creating the resume
            } else {
                console.error('Error creating resume:', response.statusText);
            }

        setIsLoading(false)

        // if (!response?.ok) {
        //     if (response.status === 402) {
        //         return toast({
        //             title: "Limit of 3 posts reached.",
        //             description: "Please upgrade to the PRO plan.",
        //             variant: "destructive",
        //         })
        //     }

        //     return toast({
        //         title: "Something went wrong.",
        //         description: "Your post was not created. Please try again.",
        //         variant: "destructive",
        //     })
        // }

    }


    return (
        <button
            onClick={onClick}
            className={cn(
                buttonVariants({ variant }),
                {
                    "cursor-not-allowed opacity-60": isLoading,
                },
                className
            )}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <Plus className="mr-2 h-4 w-4" />
            )}
            New post
        </button>
    );
};

export default CreateResumeButton;


// "use client"

// import * as React from "react"
// import { useRouter } from "next/navigation"

// import { cn } from "@/lib/utils"
// import { ButtonProps, buttonVariants } from "@/components/ui/button"
// import { toast } from "@/components/ui/use-toast"
// import { Icons } from "@/components/icons"

// interface PostCreateButtonProps extends ButtonProps { }

// export function PostCreateButton({
//     className,
//     variant,
//     ...props
// }: PostCreateButtonProps) {
//     const router = useRouter()
//     const [isLoading, setIsLoading] = React.useState<boolean>(false)

//     async function onClick() {
//         setIsLoading(true)

//         const response = await fetch("/api/posts", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 title: "Untitled Post",
//             }),
//         })

//         setIsLoading(false)

//         if (!response?.ok) {
//             if (response.status === 402) {
//                 return toast({
//                     title: "Limit of 3 posts reached.",
//                     description: "Please upgrade to the PRO plan.",
//                     variant: "destructive",
//                 })
//             }

//             return toast({
//                 title: "Something went wrong.",
//                 description: "Your post was not created. Please try again.",
//                 variant: "destructive",
//             })
//         }

//         const post = await response.json()

//         // This forces a cache invalidation.
//         router.refresh()

//         router.push(`/editor/${post.id}`)
//     }

//     return (
//         <button
//             onClick={onClick}
//             className={cn(
//                 buttonVariants({ variant }),
//                 {
//                     "cursor-not-allowed opacity-60": isLoading,
//                 },
//                 className
//             )}
//             disabled={isLoading}
//             {...props}
//         >
//             {isLoading ? (
//                 <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
//             ) : (
//                 <Icons.add className="mr-2 h-4 w-4" />
//             )}
//             New post
//         </button>
//     )
// }