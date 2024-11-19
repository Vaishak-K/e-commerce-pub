"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function DeleteOrders(deleteid: string) {
  const order = await prisma.order.delete({
    where: {
      id: deleteid,
    },
  });
  if (order === null) {
    return "There is no Account";
  }

  revalidatePath("/order");
  revalidatePath("/admin/orderapprove");
  redirect("/order");
}
