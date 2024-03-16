import { Infinity } from "lucide-react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-row w-full items-center h-full justify-around">
            <div className="flex flex-col justify-center items-center">
                <Infinity size={200} />
                <p className="text-4xl">Anginat</p>
            </div>
            <div className="w-3/12 bg-gray-100 px-10 py-10 rounded-md">
                {children}
            </div>
        </div>
    );
};

export default Layout;
