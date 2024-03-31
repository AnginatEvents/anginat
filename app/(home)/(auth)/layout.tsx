import { Infinity } from "lucide-react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex h-full w-full flex-row items-center justify-center md:justify-between">
            <div className="hidden flex-col items-center justify-center px-20 text-center md:block">
                <Infinity size={200} />
                <p className="text-4xl">Anginat</p>
            </div>
            <div className="w-full rounded-md bg-gray-100 px-10 py-10 sm:w-96">
                {children}
            </div>
        </div>
    );
};

export default Layout;
