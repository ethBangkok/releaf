"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount } from "wagmi";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const account = useAccount();
  const router = useRouter();

  // useEffect(() => {
  //   if (account.isConnected) {
  //     router.push("/dashboard");
  //   }
  // }, [account.isConnected, router]);

  return children;
}
