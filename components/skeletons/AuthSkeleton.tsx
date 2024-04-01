import { Skeleton } from "@/components/ui/skeleton";

const AuthSkeleton = () => {
    return (
        <div className="flex flex-col gap-y-4">
            <div>
                <Skeleton className="h-10 w-48" />
            </div>
            <div>
                <Skeleton className="h-12" />
            </div>
            <div>
                <Skeleton className="h-12" />
            </div>
            <div>
                <Skeleton className="mt-4 h-10" />
            </div>
            <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
                <Skeleton className="h-5 w-10" />
            </div>
            <div>
                <Skeleton className="mt-4 h-10" />
            </div>
        </div>
    );
};

export default AuthSkeleton;
