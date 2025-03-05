import { Metadata } from "next";
import { CreateUpdateProduct } from "@/components";

export const metadata: Metadata = {
  title: "Create product",
};

export default function OneProductPage() {
  return <CreateUpdateProduct />;
}
