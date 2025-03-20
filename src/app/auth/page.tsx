"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { Auth } from "@/components";

export default function AuthPage() {
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("auth_token");
    if (token) {
      router.push("/user-docs");
    }
  }, [router]);

  return <Auth />;
}
