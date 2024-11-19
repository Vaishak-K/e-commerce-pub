"use client";

import { Button } from "@nextui-org/button";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useCart } from "../products/_state/CartValues";
import Link from "next/link";

const CartProduct = dynamic(() => import("@/components/CartProduct"), {
  ssr: false,
});

function Cart() {
  const { rendered, total, val } = useCart();
  let a = val.length == 0;
  console.log("A", a);
  let c = !a ? (
    <Link href="/checkout">Add to Checkout </Link>
  ) : (
    <h1>YOur Cart is EMpty 😒</h1>
  );
  // useEffect(() => {
  //   setTotal(10);
  // }, []);
  return (
    <>
      <div className="grid sm:grid-cols-4 mx-6 ">
        <div className="col-span-3 text-3xl w-full font-semibold ">
          <div className="flex justify-between w-[90%] ">
            <h1 className="pb-6">Shopping Cart</h1>
            <h1 className="text-xl text-right">Price</h1>
          </div>
          <div>{rendered}</div>
        </div>
        <div className="col-span-1 text-center">
          <h1 className="font-bold text-3xl">Total:{total}</h1>
          <Button>{c}</Button>
        </div>
      </div>
    </>
  );
}

export default Cart;
