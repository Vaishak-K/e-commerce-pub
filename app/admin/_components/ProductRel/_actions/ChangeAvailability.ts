"use server";
import { updateProduct } from "@/app/actions/product";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function ChangeAvailability(id: string) {
  console.log(`Change Availability for ${id}  is Executing`);
  // Fetch the current availability state of the product

  const product = await prisma.product.findUnique({
    where: { id: id },
    select: { isAvailableForPurchase: true },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  // Toggle the value
  const updatedProduct = await prisma.product.update({
    where: { id: id },
    data: {
      isAvailableForPurchase: !product.isAvailableForPurchase,
    },
  });
  console.log("Updated Product", updateProduct);

  // Trigger revalidation for specific paths
  revalidatePath("/products/_state/CartValues.tsx");
  revalidatePath("/products");
  revalidatePath("/admin/products");

  // Redirect to the admin page
  redirect("/admin/products");

  // Handle errors as needed (e.g., show a message to the user)
}
