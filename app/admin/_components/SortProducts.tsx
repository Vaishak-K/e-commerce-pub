"use server";

import { prisma } from "@/lib/prisma";

export async function SortProducts(sortOption: any) {
  let adddata: any;

  if (sortOption === "priceAsc") {
    adddata = await prisma.product.findMany({
      orderBy: {
        price: "asc",
      },
    });
  } else if (sortOption === "priceDesc") {
    adddata = await prisma.product.findMany({
      orderBy: {
        price: "desc",
      },
    });
  } else if (sortOption === "nameAsc") {
    adddata = await prisma.product.findMany({
      orderBy: {
        name: "asc",
      },
    });
  } else if (sortOption === "nameDesc") {
    adddata = await prisma.product.findMany({
      orderBy: {
        name: "desc",
      },
    });
  } else {
    adddata = await prisma.product.findMany();
  }
  return adddata;
}
