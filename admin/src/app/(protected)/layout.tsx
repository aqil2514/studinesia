import { auth } from "@/auth";
import Navbar from "@/components/layouts/Navbar";
import { AppSidebar } from "@/components/layouts/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = await auth();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  if(!session) redirect("/login")

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <div className="w-full">
        <Navbar />
        {children}
      </div>
    </SidebarProvider>
  );
}
