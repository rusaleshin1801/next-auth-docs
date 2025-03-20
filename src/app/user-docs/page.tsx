"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { UserDocsTable } from "@/components";

export default function UserDocsPage() {
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("auth_token");
    if (!token) {
      router.push("/auth");
    }
  }, [router]);

  return <UserDocsTable />;
}
