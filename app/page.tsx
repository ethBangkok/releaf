"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function App() {
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (path === "/") {
      router.push("/dashboard");
    }
  }, [router]);

  return <div>Loading</div>;
}
