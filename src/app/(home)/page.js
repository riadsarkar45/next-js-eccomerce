import CategoryPost from "@/pages/CategoryPost";
import Image from "next/image";
import Product from "../products/Product";

export default function Home() {
  return (
    <div>
      <CategoryPost></CategoryPost>
      <Product/>
    </div>
  );
}
