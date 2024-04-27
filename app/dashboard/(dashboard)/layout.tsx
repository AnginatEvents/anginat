import DashboardTopBar from "@/components/dashboard/DashboardTopBar";
import Sidenav from "@/components/dashboard/Sidenav";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
    title: "Dashboard | Anginat",
    description: "Dashboard for Anginat",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen flex-row">
            <Sidenav />
            <main className="w-full overflow-auto bg-secondary pb-4 pl-72">
                <DashboardTopBar />
                <Separator />
                {children}
                <Toaster />
            </main>
        </div>
    );
}
