import { Metadata } from "next";
import { UserDocForm } from "@/components";

export const metadata: Metadata = {
  title: "Create docs",
};

export default function AddPage() {
  return <UserDocForm />;
}
