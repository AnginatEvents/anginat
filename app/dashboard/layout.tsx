import DashboardTopBar from "@/components/dashboard/DashboardTopBar";
import Sidenav from "@/components/dashboard/Sidenav";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard | Anginat",
    description: "Dashboard for Anginat",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen flex-row">
            <Sidenav />
            <main className="w-full bg-secondary">
                <DashboardTopBar />
                <Separator />
                {children}
            </main>
        </div>
    );
}
