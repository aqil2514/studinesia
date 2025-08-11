import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function MainContainer({
  children,
  className,
  ...props
}: Props) {
  return (
    <div className={cn("min-h-screen w-full", className)} {...props}>
      {children}
    </div>
  );
}
