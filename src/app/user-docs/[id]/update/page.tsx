import { Metadata } from "next";
import { UserDocForm } from "@/components";

export const metadata: Metadata = {
  title: "Update docs",
};

export default function UpdateDocsPage() {
  return <UserDocForm />;
}
