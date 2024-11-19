"use server";

import { prisma } from "@/lib/prisma";

export async function IncludeApproved(approved: any) {
  let orderval: any;

  if (approved === true) {
    orderval = await prisma.order.findMany({
      include: {
        user: true,
        address: true,
      },
    });
  } else {
    orderval = await prisma.order.findMany({
      where: {
        approveOrder: {
          equals: false,
        },
      },
      include: {
        user: true,
        address: true,
      },
    });
  }
  return orderval;
}
