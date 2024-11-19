"use client";
import { useCart } from "@/app/products/_state/CartValues";
import { Button } from "@nextui-org/button";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function CartProduct({ id, index }: { id: any; index: number }) {
  const {
    handleDecrease,
    handleIncrease,
    quantity,
    handleDelete,
    products: db,
  } = useCart();

  const productval = db.find((product: any) => product?.id === id);

  return (
    <div className="grid grid-cols-4 w-full bg-inherit border-4 border-inherit rounded-2xl px-2 py-1">
      <div className="flex gap-y-3 flex-col">
        <Image
          src={productval?.imagePath || ""}
          alt="Image Missing"
          width={150}
          height={100}
        />
        <div className="flex w-[60vw] justify-between">
          <div className="flex">
            <Button
              size="sm"
              isIconOnly
              className="bg-red-500 font-semibold sm:text-3xl text-xl rounded-2xl"
              onClick={() => handleDecrease(id, index)}
            >
              {quantity[id] === 1 ? <Trash /> : "-"}
            </Button>
            <h1 className="sm:px-5 px-2 sm:text-xl text-sm align-middle h-full">
              <input
                type="number"
                className="w-14 text-center text-xl border-2 rounded-xl "
                value={quantity[id]}
              />
            </h1>
            <Button
              isIconOnly
              className=" bg-red-500 font-semibold sm:text-3xl text-xl rounded-2xl"
              size="sm"
              onClick={() => handleIncrease(id)}
            >
              +
            </Button>
          </div>
          <Button onClick={() => handleDelete(id, index)}>Delete</Button>
        </div>
      </div>
      <div className="col-span-3 grid ">
        <h1 className="flex justify-between w-[89%] pl-4 sm:pl-0 sm:text-2xl text-base">
          {productval?.name}{" "}
          <span className="text-end ">{productval?.price}</span>
        </h1>
      </div>
    </div>
  );
}

export default CartProduct;
