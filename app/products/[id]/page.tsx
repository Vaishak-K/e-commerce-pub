"use client";

import Image from "next/image";
import { EmptyStarIcon, StarIcon } from "@/components/icons";
import * as _ from "lodash";
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";

import { notFound } from "next/navigation";
import { useCart } from "../_state/CartValues";
import LoadingSkeleton from "../_components/ProductLoadingSkeleton"; // Import LoadingSkeleton

type ProductProps = {
  params: {
    id: String;
  };
};

function Page({ params }: ProductProps) {
  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState<any>({});

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Set loading to true at the beginning
      try {
        const response = await fetch(`/api/products/${params.id}`);
        setResponse(response);

        console.log("Response is here:", response);
        // Check if the response is okay
        if (!response.ok) {
          notFound();
        }

        const data = await response.json();
        console.log(data); // Log the fetched data
        setProducts(data.products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false); // Ensure loading is set to false in both cases
      }
    };

    fetchProducts();
  }, [params.id]);

  const [quantity, setQuantity] = useState(1);
  const p = Math.round(products?.rating?.rate || 0);
  const unfill = 5 - p;
  const arrp = _.range(p);
  const unfillarr = _.range(unfill);
  const renderedstar = arrp.map((arr, i) => {
    return <StarIcon key={i} />;
  });

  const notfilled = unfillarr.map((arr, i) => {
    return <EmptyStarIcon key={i} />;
  });

  const a = Math.round(
    Math.floor(Math.random() * 100) + Number(products.price)
  );
  const offerPercentage = Math.round(((a - Number(products?.price)) / a) * 100);
  const { addToCart } = useCart();

  return (
    <>
      {loading ? (
        <LoadingSkeleton /> // Show the skeleton loader while loading
      ) : (
        <div className="grid sm:grid-cols-4 w-full justify-items-center">
          <div className="relative">
            <h1
              className={`absolute font-medium text-2xl text-center ${
                offerPercentage > 50
                  ? `bg-green-600`
                  : offerPercentage > 30
                    ? `bg-yellow-400`
                    : `bg-blue-500`
              } text-white rounded-full px-4 py-2`}
            >
              {offerPercentage}%<br /> Off
            </h1>
            <Image
              className={products?.isAvailableForPurchase ? "" : "grayscale"}
              src={products?.imagePath}
              alt="Chimma"
              width={300}
              height={200}
            />
          </div>
          <div className="col-span-2 grid gap-y-8">
            <div className="grid gap-4">
              <h1 className="w-full text-4xl font-semibold">{products.name}</h1>
              <div className="flex w-11/12 justify-center">
                <h1 className="rounded-md bg-green-500 px-2 py-1 mr-4">
                  {products?.rating?.rate || 0}
                </h1>
                <div className="flex justify-center">
                  {renderedstar}
                  {notfilled}
                </div>
                <div className="flex w-2/5 justify-end font-semibold ">
                  {products?.rating?.count} Reviews
                </div>
              </div>
              <h1 className="w-2/3 text-2xl text-red-500 font-semibold">
                <span className="text-xl text-default-foreground bg-transparent line-through">
                  Rs.{a}
                </span>
                &emsp; Rs.{products?.price}
              </h1>
            </div>
            <div className="hidden sm:flex sm:flex-col place-self-start pt-4 px-10 start-0">
              <h1 className="text-2xl font-semibold place-self-center pb-5">
                Product Details
              </h1>
              <ul className="w-[90%] place-self-center text-left">
                <li className="grid grid-cols-2 justify-between justify-items-center font-medium text-left text-lg pb-5">
                  Category: <span>{products?.category}</span>
                </li>
                <li className="grid grid-cols-2 justify-between justify-items-center font-normal text-lg text-left ">
                  Description:{" "}
                  <span className="text-base">{products?.description}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-screen bg-transparent/10 sm:w-full sm:h-[75vh] rounded-large">
            {products.isAvailableForPurchase ? (
              <div className="gap-y-10 justify-evenly sm:h-[75vh] sm:w-full flex flex-col py-3 pb-10 pt-9">
                <div className="flex justify-evenly pt-5">
                  <label htmlFor="quantity" className="text-lg font-medium">
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-20 text-center font-medium"
                    defaultValue={1}
                  />
                </div>
                <div className="flex flex-col gap-y-10">
                  <Button
                    onClick={() => addToCart(products, quantity)}
                    className="text-lg font-medium bg-gradient-to-r from-orange-400 to-yellow-500"
                    disabled={response?.ok ? false : true}
                  >
                    Add to Cart
                  </Button>
                  <Button className="text-lg font-medium bg-gradient-to-r from-blue-500 to-slate-600">
                    Buy Now
                  </Button>
                </div>
              </div>
            ) : (
              <div className="gap-y-10 justify-evenly sm:h-[75vh] sm:w-full font-medium text-lg flex flex-col py-3 pb-10 pt-9">
                <h1>This Product does not exist</h1>
                <Button
                  onClick={() => alert("Product is Out of Stock")}
                  className="text-lg font-medium bg-gradient-to-r from-orange-400 to-yellow-500"
                  disabled={response?.ok ? false : true}
                >
                  Add to Cart
                </Button>
                <Button
                  onClick={() => alert("Product is Out of Stock")}
                  className="text-lg font-medium bg-gradient-to-r from-blue-500 to-slate-600"
                >
                  Buy Now
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Page;
