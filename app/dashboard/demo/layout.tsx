const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex h-[100vh] items-center justify-center bg-gray-100">
            <div className="flex items-center">{children}</div>
        </div>
    );
};

export default Layout;
