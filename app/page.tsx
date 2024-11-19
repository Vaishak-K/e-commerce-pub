import { prisma } from "@/lib/prisma";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Image from "next/image";
import ProductGallery from "@/components/ProductGallery";

export default async function Home() {
  const categories = ["Electronics", "Toys", "Fashion"];
  let products: any = [];
  if (categories) {
    products = await Promise.all(
      categories.map(async (cat: string) => {
        return await prisma.product.findMany({
          where: {
            category: cat,
          },
        });
      })
    );
  }
  // console.log("Products", products);
  return (
    <>
      <Carousel className="w-full">
        <CarouselContent>
          <CarouselItem>
            <Image
              src="/amazon1.jpg"
              alt="amazonlogo"
              width={1920}
              height={1080}
            />
          </CarouselItem>
          <CarouselItem>
            <Image
              src="/amazon2.jpg"
              alt="amazonlogo2"
              width={1280}
              height={720}
            />
          </CarouselItem>
          <CarouselItem>
            <Image
              src="/amazon3.jpg"
              alt="amazonlogo3"
              width={1280}
              height={720}
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="text-xl" />
        <CarouselNext />
      </Carousel>
      <div className="pt-5"></div>
      {products?.map((product: any, i: number) => {
        return (
          <ProductGallery key={i} products={product} category={categories[i]} />
        );
      })}
    </>
  );
}
