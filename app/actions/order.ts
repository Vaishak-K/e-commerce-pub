"use server";

import { prisma } from "@/lib/prisma";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function AddOrder(
  quantity: any,
  total: any,
  selectedAddress: any,
  val: any
) {
  let ids: any = {};
  val?.map(() => {
    ids;
  });
  const session = await getServerSession(authOptions);
  const orderData = await prisma.order.create({
    data: {
      quantity: JSON.stringify(quantity),
      price: total,
      address: {
        connect: {
          id: Number(selectedAddress),
        },
      },
      user: {
        connect: {
          email: String(session?.user?.email),
        },
      },
      approveOrder: false,
      product: {
        connect: val?.map((value: any) => ({ id: value })),
      },
    },
  });
  console.log("Order Data=>", orderData);
  if (orderData) {
    const userData = await prisma.user.update({
      where: {
        email: String(session?.user?.email),
      },
      data: {
        cart: null,
        val: null,
        total: 0,
        quantity: 0,
      },
    });
  }
  revalidatePath("/order");
  revalidatePath("/admin");
  revalidatePath("/admin/orderapprove");
  redirect("/order");
}
