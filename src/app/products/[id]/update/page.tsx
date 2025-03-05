import { Metadata } from "next";
import { CreateUpdateProduct } from "@/components";

export const metadata: Metadata = {
  title: "Update product",
};

export default function UpdateProductPage() {
  return <CreateUpdateProduct />;
}
