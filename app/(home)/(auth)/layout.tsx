import { Infinity } from "lucide-react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex h-full w-full flex-row items-center justify-around">
            <div className="flex flex-col items-center justify-center">
                <Infinity size={200} />
                <p className="text-4xl">Anginat</p>
            </div>
            <div className="w-3/12 rounded-md  bg-gray-100 px-10 py-10">
                {children}
            </div>
        </div>
    );
};

export default Layout;
