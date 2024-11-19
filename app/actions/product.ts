"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { DeleteIcon } from "../address/_components/DeleteIcon";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// const imageSchema = z.instanceof(File, { message: "Required" }).refine(
//   file => file.size === 0 || file.type.startsWith("image/")
// )

const addSchema = z.object({
  id: z.string().min(1, { message: "Product ID is required" }).optional(),
  name: z.string().min(1, { message: "Product name is required" }),
  price: z.coerce
    .number()
    .int()
    .min(1, { message: "Price must be a positive integer" }),
  quantity: z.coerce
    .number()
    .int()
    .min(1, { message: "Quantity must be at least 1" }),
  tax: z.coerce
    .number()
    .int()
    .min(0, { message: "Tax must be a non-negative integer" }),
  imagePath: z.string().min(1, { message: "Image Path is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  category: z.string().min(1, { message: "Select a Category" }),
  isAvailableForPurchase: z.coerce.string(),

  //   image: imageSchema.refine(file => file.size > 0, "Required")// Allowing tax to be zero
});

export async function addProduct(prevState: unknown, formData: FormData) {
  const obj = Object.fromEntries(formData.entries());
  console.log("Raw Object:", obj);
  const result = addSchema.safeParse(obj);
  if (result.success === false) {
    console.log("False");
    console.log(result.error.formErrors.fieldErrors);
    return result.error.formErrors.fieldErrors;
  }
  const data = result.data;
  console.log("Result Customer Data:", data);
  const dbdata = await prisma.product.create({
    data: {
      name: data.name,
      price: data.price,
      quantity: data.quantity,
      tax: data.tax,
      imagePath: data.imagePath,
      description: data.description,
      category: data?.category,
      isAvailableForPurchase:
        data.isAvailableForPurchase === "undefined"
          ? false
          : Boolean(data.isAvailableForPurchase),
    },
  });
  console.log(dbdata);
  revalidatePath("/products/_state/CartValues.tsx");
  revalidatePath("/products");
  revalidatePath("/admin");
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  const deleteProduct = await prisma.product.delete({
    where: {
      id: id,
    },
  });
  if (deleteProduct === null) {
    return "Error";
  }
  console.log("Deleted Product:", deleteProduct);
  revalidatePath("/products/_state/CartValues.tsx");
  revalidatePath("/products");
  revalidatePath("/admin");
  revalidatePath("/admin/products");
  redirect("/admin/products");
}
export async function updateProduct(
  id: string,
  prevState: unknown,
  formData: FormData,
  customer1?: any
) {
  const obj = Object.fromEntries(formData.entries());
  const result = addSchema.safeParse(obj);
  if (result.success === false) return result.error.formErrors.fieldErrors;
  const data = result.data;
  const dbupdate = await prisma.product.update({
    where: { id },
    data: {
      name: data.name,
      price: data.price,
      quantity: data.quantity,
      tax: data.tax,
      imagePath: data.imagePath,
      description: data.description,
      category: data?.category,
      isAvailableForPurchase:
        data.isAvailableForPurchase === "undefined"
          ? false
          : Boolean(data.isAvailableForPurchase),
    },
  });
  console.log(dbupdate);
  revalidatePath("/products/_state/CartValues.tsx");
  revalidatePath("/products");
  revalidatePath("/admin");
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function AddProductValue(product1: any) {
  // const obj = Object.fromEntries(formData.entries());
  // console.log("Raw Object:", obj);
  const finder = await prisma?.product.findUnique({
    where: {
      imagePath: product1?.imagePath,
    },
  });
  if (finder == null) {
    const result = addSchema.safeParse(product1);
    if (result.success === false) {
      console.log("False");
      console.log(result.error.formErrors.fieldErrors);
      return result.error.formErrors.fieldErrors;
    }
    const data = result.data;
    console.log("Result Customer Data:", data);
    try {
      const dbdata = await prisma.product.create({
        data: {
          name: data.name,
          price: data.price,
          quantity: data.quantity,
          tax: data.tax,
          imagePath: data.imagePath,
          description: data.description,
          category: data?.category,
          isAvailableForPurchase: Boolean(data.isAvailableForPurchase),
        },
      });
      console.log(dbdata);
    } catch (err) {
      console.error(err);
    }
  }
  revalidatePath("/products/_state/CartValues.tsx");
  revalidatePath("/products");
  revalidatePath("/admin");
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function UpdateProductValue(product1: any) {
  // const obj = Object.fromEntries(formData.entries());
  // console.log("UpdateCustomer");
  // console.log("Raw Object:", customer1);
  const finder = await prisma?.product.findUnique({
    where: {
      imagePath: product1?.imagePath,
    },
  });
  // console.log("Finder:", finder);
  const result = addSchema.safeParse(product1);
  if (result.success === false) {
    console.log("False");
    console.log(result.error.formErrors.fieldErrors);
    return result.error.formErrors.fieldErrors;
  }
  const data = result.data;

  if (finder === null) {
    try {
      const dbdata = await prisma.product.create({
        data: {
          name: data.name,
          price: data.price,
          quantity: data.quantity,
          tax: data.tax,
          imagePath: data.imagePath,
          description: data.description,
          category: data?.category,
          isAvailableForPurchase: Boolean(data.isAvailableForPurchase),
        },
      });
      console.log(dbdata);
    } catch (err) {
      console.error(err);
    }
  } else {
    // console.log("Existing Data Name", data?.email);
    try {
      const dbdata = await prisma.product.update({
        where: {
          id: product1?.id,
        },
        data: {
          name: data.name,
          price: data.price,
          quantity: data.quantity,
          tax: data.tax,
          imagePath: data.imagePath,
          description: data.description,
          category: data?.category,
          isAvailableForPurchase: Boolean(data.isAvailableForPurchase),
        },
      });
      console.log(dbdata);
    } catch (err) {
      console.error(err);
    }
  }
  revalidatePath("/products/_state/CartValues.tsx");
  revalidatePath("/products");
  revalidatePath("/admin");
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function JustAddProductValue(product1: any) {
  // const obj = Object.fromEntries(formData.entries());
  // console.log("JustAdd");
  // console.log("Raw Object:", customer1?.phone);
  const finder = await prisma?.product.findUnique({
    where: {
      imagePath: product1?.imagePath,
    },
  });
  console.log("Finder:", finder);
  const result = addSchema.safeParse(product1);
  if (result.success === false) {
    console.log("False");
    console.log(result.error.formErrors.fieldErrors);
    return result.error.formErrors.fieldErrors;
  }
  const data = result.data;
  // console.log("Result Customer Data:", data);
  if (finder === null) {
    try {
      const dbdata = await prisma.product.create({
        data: {
          name: data.name,
          price: data.price,
          quantity: data.quantity,
          tax: data.tax,
          imagePath: data.imagePath,
          description: data.description,
          category: data?.category,
          isAvailableForPurchase: Boolean(data.isAvailableForPurchase),
        },
      });
      console.log(dbdata);
    } catch (err) {
      console.error(err);
    }
  }
  // revalidatePath("/products/_state/CartValues.tsx");
  revalidatePath("/products");
  revalidatePath("/admin/products");
  revalidatePath("/admin");
  revalidatePath("/admin/products");
  redirect("/admin/products");
}
