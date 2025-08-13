"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { contentMenuItems } from "@/constants/sidebarMenu";
import { Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center">
          <Image
            width={160}
            height={50}
            alt="Admin logo"
            src="/images/main-logo.png"
            className="hover:scale-105 transition-transform duration-200"
          />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavigationSidebarGroup pathname={pathname} />
        <ContentSidebarGroup pathname={pathname} />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

const NavigationSidebarGroup: React.FC<{ pathname: string }> = ({
  pathname,
}) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Navigasi</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenuButton asChild isActive={pathname === "/dashboard"}>
          <Link href={"/dashboard"}>
            <Home /> <span>Dashboard</span>
          </Link>
        </SidebarMenuButton>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

const ContentSidebarGroup: React.FC<{ pathname: string }> = ({ pathname }) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Konten</SidebarGroupLabel>
      <SidebarGroupContent>
        {contentMenuItems.map((item, i) => {
          return (
            <SidebarMenuItem key={i + 1} className="list-none">
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith(item.url)}
              >
                <Link href={item.url}>
                  <item.Icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
              {item.actionUrl && item.ActionIcon && (
                <SidebarMenuAction asChild>
                  <Link href={item.actionUrl}>
                    <item.ActionIcon />
                  </Link>
                </SidebarMenuAction>
              )}
            </SidebarMenuItem>
          );
        })}
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
