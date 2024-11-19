"use server";

import { prisma } from "@/lib/prisma";
export async function getStatsData(a: number) {
  let c: any;
  if (a === 1) {
    const db: any = await prisma.order.aggregate({
      _sum: {
        price: true,
      },
    });
    return db;
  } else if (a === 2) {
    const fullorders = await prisma.order.findMany();
    return fullorders;
  } else if (a === 3) {
    const toApprove = await prisma.order.aggregate({
      _count: {
        approveOrder: true,
      },
      where: {
        approveOrder: false,
      },
    });
    return toApprove;
  } else if (a === 4) {
    const lastorderupdate = await prisma.order.findFirst({
      select: {
        updatedAt: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return lastorderupdate;
  } else if (a === 5) {
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: "desc", // Correctly use `orderBy` for sorting by `createdAt` in descending order
      },
      include: {
        user: true, // Include customer data with each payment
      },
    });
    return orders;
  }
}
