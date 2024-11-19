"use server";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { headers } from "next/headers";
import { error } from "console";

const AddressSchema = z.object({
  name: z.string().min(1, { message: "Enter a Name" }),
  address1: z.string().min(1, { message: "Enter Something" }),
  address2: z.string().min(1, { message: "Enter Address Line 2:" }),
  phone: z.coerce
    .number()
    .int({ message: "Phone number must be an integer." })
    .min(1000000000, { message: "Enter a Valid Phone Number:" }),
  pincode: z.coerce
    .number()
    .int({ message: "Pincode be an integer." })
    .min(100000, { message: "Enter a Valid Pincode (Min)" })
    .max(999999, { message: "Enter a Valid Pincode (Max)" }),
});

export async function FetchAddress() {
  const session = await getServerSession(authOptions);
  const data = await prisma.user.findUnique({
    where: {
      email: String(session?.user?.email),
    },
    select: {
      address: true,
    },
  });
  return data;
}

export async function AddAddress(
  c: any,
  prevState: unknown,
  formData: FormData
) {
  const session = await getServerSession(authOptions);
  let a: any = Object.fromEntries(formData);
  const resultdata = AddressSchema.safeParse(a);
  if (resultdata.success === false) {
    return resultdata.error.formErrors.fieldErrors;
  }
  a = resultdata?.data;
  const awc = await prisma?.address.create({
    data: {
      name: String(a?.name),
      address1: String(a?.address1),
      address2: String(a?.address2),
      phonenumber: Number(a?.phone),
      pincode: Number(a?.pincode),
      user: {
        connect: {
          email: String(session?.user?.email),
        },
      },
    },
  });
  if (c?.startsWith("/address")) {
    revalidatePath("/address");
    redirect("/address");
  } else if (c?.startsWith("/checkout")) {
    revalidatePath("/checkout");
    redirect("/checkout");
  }
}
export async function UpdateAddress(
  id: number,
  c: any,
  prevState: unknown,
  formData: FormData
) {
  const session = await getServerSession(authOptions);
  let a: any = Object.fromEntries(formData);
  const resultdata = AddressSchema.safeParse(a);
  if (resultdata.success === false) {
    return resultdata.error.formErrors.fieldErrors;
  }
  a = resultdata?.data;
  const awc = await prisma?.address.update({
    where: { id: id },
    data: {
      name: String(a?.name),
      address1: String(a?.address1),
      address2: String(a?.address2),
      phonenumber: Number(a?.phone),
      pincode: Number(a?.pincode),
      user: {
        connect: {
          email: String(session?.user?.email),
        },
      },
    },
  });
  if (c?.startsWith("/address")) {
    revalidatePath("/address");
    redirect("/address");
  } else if (c?.startsWith("/checkout")) {
    revalidatePath("/checkout");
    redirect("/checkout");
  }
}

export async function deleteAddress(id: number, c: any) {
  const deleteAdd = await prisma.address.delete({
    where: {
      id: id,
    },
  });
  if (deleteAdd == null) {
    return "Error";
  }
  console.log("Deleted Address is", deleteAdd);
  if (c?.startsWith("/address")) {
    revalidatePath("/address");
    redirect("/address");
  } else if (c?.startsWith("/checkout")) {
    revalidatePath("/checkout");
    redirect("/checkout");
  }
}
