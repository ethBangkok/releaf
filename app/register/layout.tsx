"use client";
import type { Metadata } from "next";
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
    if (wallet) router.push("/dashboard");
  }, [wallet]);

  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
