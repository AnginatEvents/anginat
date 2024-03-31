import Navbar from "@/components/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="flex h-screen flex-col items-center justify-center">
            <Navbar />
            <div className="container flex h-full w-full justify-center pt-20">
                {children}
            </div>
        </main>
    );
};

export default Layout;
