import { Skeleton } from "@/components/ui/skeleton";

const FormCreateSkeleton = () => {
  return (
    <div className="mt-8 flex gap-10">
      <div className="w-1/2">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="mt-5 h-8 w-full" />
        <div className="mt-5 w-full">
          <div className="w-full gap-1.5">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="mt-3 h-16 w-full" />
          </div>
          <div className="mt-6 w-full gap-1.5">
            <Skeleton className="h-4 w-full" />
            <div className="w-full">
              <Skeleton className="mt-3 h-28 w-full" />
            </div>
          </div>
          <div className="mt-5 w-full items-center gap-1.5">
            <Skeleton className="h-4 w-full" />
            <div className="relative">
              <Skeleton className="mt-3 h-10 w-full" />
            </div>
          </div>
          <div className="float-end mt-5 flex gap-3">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </div>
      <div className="flex-1">
        <Skeleton className="h-[500px] w-full" />
      </div>
    </div>
  );
};

export default FormCreateSkeleton;
