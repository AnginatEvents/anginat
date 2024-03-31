import DashboardUserCard from "@/components/dashboard/DashboardUserCard";

const DashboardTopBar = () => {
    return (
        <div className="flex h-16 flex-row items-center justify-between px-6 py-12 align-middle">
            <strong className="text-5xl">Dashboard</strong>
            <DashboardUserCard />
        </div>
    );
};

export default DashboardTopBar;
