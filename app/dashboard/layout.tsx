import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/session";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    return notFound();
  }

  return (
    <div className="flex min-h-screen items-start w-full max-w-screen-xl flex-col space-y-6 z-20">
        <main className="px-5 w-full">
          {children}
        </main>
    </div>
  );
}
