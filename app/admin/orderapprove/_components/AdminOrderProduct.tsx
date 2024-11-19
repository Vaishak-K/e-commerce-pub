"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/app/products/_state/CartValues";
import Link from "next/link";

export default function OrderProduct({
  quantity,
  products,
}: {
  quantity: string;
  products: any;
}) {
  const [quantity1, setQuantity1] = useState<any>({});
  const val = Object.keys(quantity1);

  useEffect(() => {
    if (quantity) {
      setQuantity1(JSON.parse(quantity));
    }
  }, [quantity]);

  function findValue(id: any) {
    return products ? products.find((product: any) => product.id === id) : null;
  }

  const rendered = products
    ? val.map((v: any) => {
        const a = findValue(v);
        if (!a) {
          console.warn(`Product with ID ${v} not found`);
          return null;
        }
        return (
          <div key={v} className="bg-white shadow-md rounded-lg p-4 mb-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-8">
              <div className="flex flex-col">
                <Link
                  href={`products/${a.id}`}
                  className="text-lg sm:text-xl font-semibold text-gray-800"
                >
                  {a.name || "Product Name"}
                </Link>
                <p className="text-sm sm:text-md text-gray-500">
                  Quantity: {quantity1[a.id] || 0}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg sm:text-xl font-bold text-gray-900">
                  Rs.{(a.price * quantity1[a.id]).toFixed(2) || "0.00"}
                </p>
              </div>
            </div>
          </div>
        );
      })
    : null;

  return <div className="p-4 sm:p-6">{rendered}</div>;
}
