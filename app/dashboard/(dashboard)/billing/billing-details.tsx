import { Button } from "@/components/ui/button";

export default function BillingDetails() {
    const planName = "Growth Plan";
    const billingCycle = "Monthly";
    const dateOfPayment = "xx/xx/xxxx";
    const planCost = "xxx";

    return (
        <div className="flex h-auto flex-row items-center justify-between px-4 py-9">
            <div>
                <div className="flex items-center justify-between gap-24">
                    <div className="font-medium">
                        <div>{planName}</div>
                        <div className="text-sm">Billing Cycle</div>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <div className="text-sm text-[#7F8FDF]">
                            Date of Payment
                        </div>
                        <div className="font-medium">{dateOfPayment}</div>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <div className="text-sm text-[#7F8FDF]">
                            Billing Cycle
                        </div>
                        <div className="font-medium">{billingCycle}</div>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <div className="text-sm text-[#7F8FDF]">Plan Cost</div>
                        <div className="font-medium">{planCost}</div>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <div className="text-[#7F8FDF]">Subtotal</div>
                        <div className="font-medium" text-sm>
                            See your Total (Including taxes) in Review
                        </div>
                    </div>
                </div>
            </div>

            <Button className="ml-5 w-48 bg-[#4D98FF] hover:bg-[#80b5ff]">
                Pay Now
            </Button>
        </div>
    );
}
