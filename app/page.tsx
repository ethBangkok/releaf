"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function IndexPage() {
  const router = useRouter();
  const path = usePathname();

  console.log(router, path);

  const shouldRedirect = false;

  useEffect(() => {
    if (path === "/") {
      router.push("/dashboard");
    }
  }, [router]);

  return <div>{/* Content of your page */}</div>;
}
