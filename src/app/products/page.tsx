import { Metadata } from "next";
import { ProductTable } from "@/components";

export const metadata: Metadata = {
  title: "Products",
};

export default function ProductsPage() {
  return <ProductTable />;
}
