import Link from "next/link";
import Navlinks from "./Navlinks";

const Sidenav = () => {
    return (
        <div className="flex flex-col justify-between h-full">
            <div>
                <Navlinks />
            </div>
            <Link href="/help">Help</Link>
        </div>
    );
};

export default Sidenav;
