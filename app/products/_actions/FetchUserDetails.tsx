"use server";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function FetchCart() {
  const session = await getServerSession(authOptions);
  const data = await prisma.user.findUnique({
    where: {
      email: String(session?.user?.email),
    },
    include: {
      order: true,
    },
  });
  return data;
}
