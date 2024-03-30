import Sidenav from "@/components/dashboard/Sidenav";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-row gap-3 h-full">
            <Sidenav />
            <main>{children}</main>
        </div>
    );
};

export default Layout;
