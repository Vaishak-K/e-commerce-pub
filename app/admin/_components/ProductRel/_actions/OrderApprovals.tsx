"use server";
import { updateProduct } from "@/app/actions/product";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function OrderApprovals(id: string) {
  console.log(`Approving Order for ${id}  is Executing`);
  // Fetch the current availability state of the product

  const product = await prisma.order.findUnique({
    where: {
      id: id,
    },
    select: { approveOrder: true },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  // Toggle the value
  const updatedProduct = await prisma.order.update({
    where: { id: id },
    data: {
      approveOrder: !product.approveOrder,
    },
  });
  console.log("Updated Product", updateProduct);
  try {
    // Trigger revalidation for specific paths
    revalidatePath("/order");
    revalidatePath("/admin/products");
    revalidatePath("/admin");
    revalidatePath("/admin/orderapprove");

    // Redirect to the admin page
    redirect("/admin/orderapprove");
  } catch (error) {
    console.error("Error during revalidation or redirect:", error);
    // Handle errors as needed (e.g., show a message to the user)
  }
}
