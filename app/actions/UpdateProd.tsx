"use server";

import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

export async function UpdateCart(
  cart1: any,
  quantity1: any,
  val1: any,
  total1: any
) {
  const session = await getServerSession(authOptions);
  console.log(session?.user?.email);
  const updateData = await prisma.user.update({
    where: {
      email: String(session?.user?.email),
    },
    data: {
      cart: JSON.stringify(quantity1),
      quantity: cart1,
      val: JSON.stringify(val1),
      total: total1,
    },
  });
  console.log("Updated user=>", updateData);
}
