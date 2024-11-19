"use client";

import { Card, CardFooter, Image, Button, CardBody } from "@nextui-org/react";
import Link from "next/link";
import { useCart } from "@/app/products/_state/CartValues";

export default function ProductCard({
  imageurl,
  alter,
  product,
}: {
  imageurl: string;
  alter: string;
  product: any;
}) {
  const { addToCart } = useCart();

  // Function to shorten the product name
  const getShortenedName = (name: string, maxLength: number) => {
    if (name.length > maxLength) {
      return name.substring(0, maxLength) + "..."; // Append ellipsis for overflow
    }
    return name;
  };

  return (
    <Card shadow="sm" className="w-96 h-96">
      <CardBody className="overflow-visible p-0 h-full flex flex-col items-center">
        <Link
          href={`/products/${product?.id}`}
          className="flex justify-center items-center h-full"
        >
          <Image
            shadow="sm"
            radius="lg"
            height={250}
            width={250}
            alt={product?.name}
            className={
              product?.isAvailableForPurchase
                ? "h-64 w-64"
                : "h-64 w-64 grayscale"
            }
            src={product?.imagePath}
          />
        </Link>
      </CardBody>
      <CardFooter className="flex flex-col text-small justify-between p-4">
        <div className="flex flex-col items-center">
          <b className="text-lg">{getShortenedName(product?.name, 30)}</b>
          <p className="text-default-500 font-normal text-base">
            Rs.{product?.price}
          </p>
        </div>
        <Button
          className={`mt-2 w-52  text-base text-background ${product?.isAvailableForPurchase ? "bg-foreground" : "bg-gray-500"} hover:bg-backgorund/80 h-32`} // Increased height
          variant="flat"
          color="default"
          radius="lg"
          size="lg"
          onClick={() =>
            product?.isAvailableForPurchase
              ? addToCart(product, 1)
              : alert("Product is not of Shock")
          }
        >
          {product?.isAvailableForPurchase ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardFooter>
    </Card>
  );
}
