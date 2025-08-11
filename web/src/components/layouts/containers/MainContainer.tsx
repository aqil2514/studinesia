import { cn } from "@/lib/utils";
import React from "react";

interface MainContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function MainContainer({
  children,
  className,
  ...props
}: MainContainerProps) {
  return (
    <div {...props} className={cn("min-h-screen pb-12 bg-slate-100", className)}>
      {children}
    </div>
  );
}
