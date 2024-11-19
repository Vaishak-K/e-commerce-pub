"use client";

import { useCart } from "@/app/products/_state/CartValues";
import Link from "next/link";
import { useState } from "react";

export default function OrderProduct({ quantity, price }: any) {
  const { products, loading } = useCart();
  const [prod, setProd] = useState();
  let quantity1 = JSON.parse(quantity);
  const val = Object.keys(quantity1);
  let a: any;

  function findValue(id: any) {
    return products ? products.find((product) => product.id === id) : null;
  }

  const rendered = products
    ? val?.map((v: any) => {
        a = findValue(v);
        return (
          <div key={v} className="bg-white shadow-md rounded-lg p-4 mb-4">
            {!loading && a && (
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <div className="flex flex-col mb-4 sm:mb-0">
                  <Link
                    href={`products/${a.id}`}
                    className="text-lg font-semibold text-gray-800"
                  >
                    {a.name || "Product Name"}
                  </Link>
                  <p className="text-gray-500">Quantity: {quantity1[a.id]}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900">
                    Rs.{(a.price * quantity1[a.id]).toFixed(2)}
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      })
    : null;

  return <div className="p-4">{rendered}</div>;
}
