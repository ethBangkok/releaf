"use client";
import type { Metadata } from "next";
import "../globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const wallet = localStorage.getItem("wallet");
  const router = useRouter();

  useEffect(() => {
    if (!wallet) router.push("/register");
  }, [wallet]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <main className="m-5 w-full ml-0">{children}</main>
    </SidebarProvider>
  );
}
