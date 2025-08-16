import { cn } from "@/lib/utils";

interface GridContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function GridContainer({
  children,
  className,
  ...props
}: GridContainerProps) {
  return (
    <div {...props} className={cn("grid grid-cols-1 md:grid-cols-[75%_auto] gap-4", className)}>
      {children}
    </div>
  );
}
