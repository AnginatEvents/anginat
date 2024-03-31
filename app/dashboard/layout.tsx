import Sidenav from "@/components/dashboard/Sidenav";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex h-screen flex-row">
            <Sidenav />
            <main className="w-full bg-secondary">{children}</main>
        </div>
    );
};

export default Layout;
