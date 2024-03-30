import Navbar from "@/components/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="flex h-screen flex-col items-center justify-center">
            <Navbar />
            <div className="h-full w-full pt-20">{children}</div>
        </main>
    );
};

export default Layout;
