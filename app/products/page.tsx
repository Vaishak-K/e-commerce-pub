"use client";

import { title } from "@/components/primitives";
import ProductCard from "@/components/ProductCard";

import { useEffect, useState } from "react";
import { useCart } from "./_state/CartValues";
import { usePathname } from "next/navigation";

export default function PricingPage() {
  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  // const { setTotal } = useCart();
  // useEffect(() => {
  //   setTotal((p: number) => p + 5);
  // }, []);
  console.log("Product page is Executing");
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        // console.log(data); // Log the fetched data
        setProducts(data.products);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false); // Ensure loading is set to false after fetching
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="overflow-hidden">
      <h1 className={`${title({ color: "green" })}`}>All Products</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 w-screen gap-2 gap-y-10 mt-5">
          {products.map((product: any) => (
            <ProductCard
              product={product}
              key={product?.id}
              imageurl={product?.imagePath}
              alter={product?.name}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
