import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { greatVibes } from "@/config/fonts";

export default function CategoryArticleSkeleton() {
  return (
    <div className="bg-white h-[500px] w-[350px] shadow-2xl rounded-2xl group">
      {/* Gambar */}
      <div className="overflow-hidden rounded-tl-2xl rounded-tr-2xl">
        <Skeleton className="rounded-tl-2xl rounded-tr-2xl group-hover:scale-105 duration-200 w-[350px] h-[180px]" />
      </div>
      {/* Teks */}
      <div className="space-y-4 mt-4 px-4 relative grid grid-rows-[auto_1fr_auto]">
        <p
          className={`${greatVibes.className} text-yellow-500 text-4xl font-extrabold bg-white absolute -top-15 left-[40%] p-2 rounded-full group-hover:rotate-12 duration-300 cursor-default select-none`}
        >
          S
        </p>
        <Skeleton className="w-full" />
        <Separator />
        <Skeleton className="w-full" />
        <br />
        <Skeleton className="text-right absolute bottom-0 right-5" />
      </div>
    </div>
  );
}
