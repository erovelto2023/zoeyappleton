import { AdminSidebar } from "@/components/admin/sidebar";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await currentUser();
    const adminEmail = process.env.ADMIN_EMAIL;
    const isAuthorized = user?.emailAddresses.some(e => e.emailAddress === adminEmail);

    if (!isAuthorized) {
        redirect("/");
    }

    return (
        <div className="h-full relative bg-slate-100 dark:bg-slate-900 min-h-screen">
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
                <AdminSidebar />
            </div>
            <main className="md:pl-72 h-full">
                {children}
            </main>
        </div>
    );
}
