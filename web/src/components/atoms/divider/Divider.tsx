import { cn } from "@/lib/utils";

interface DividerProps {
  className?: string;
}

export default function Divider({ className }: DividerProps) {
  return (
    <hr
      className={cn(
        "my-6 border-t border-gray-300 mx-auto w-1/2",
        className
      )}
    />
  );
}
