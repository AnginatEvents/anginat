import { Button } from "@/components/ui/button";

export default function CurrentPlanSummary() {
    const plan = "Growth Plan";
    const cycle = "Monthly";
    const cost = "xxx";
    return (
        <div className="flex flex-row items-center justify-between px-4">
            <div className="flex items-center justify-between gap-24">
                <div className="font-medium">Current Plan Summary</div>
                <div className="flex flex-col space-y-1">
                    <div className="text-zinc-700">Plan Name</div>
                    <div className="font-medium">{plan}</div>
                </div>
                <div className="flex flex-col space-y-1">
                    <div className="text-zinc-700">Billing Cycle</div>
                    <div className="font-medium">{cycle}</div>
                </div>
                <div className="flex flex-col space-y-1">
                    <div className="text-zinc-700">Plan Cost</div>
                    <div className="font-medium">{cost}</div>
                </div>
            </div>
            <div>
                <Button variant="green" className="ml-8 w-48 rounded-sm">
                    Upgrade
                </Button>
            </div>
        </div>
    );
}
