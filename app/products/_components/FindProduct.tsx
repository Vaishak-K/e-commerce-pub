"use server";
import { prisma } from "@/lib/prisma";

export default async function FindProduct(id: any) {
  const pricedata = await prisma.product.findUnique({
    where: {
      id: id,
    },
  });
  return pricedata;
}
