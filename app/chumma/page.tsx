import React from "react";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

async function page() {
  const session = await getServerSession(authOptions);
  const users = await prisma.user.findMany();
  const orderval = await prisma.order.findMany({
    include: {
      user: true, // Include related orders
    },
  });
  console.log("OrdervAL =>", orderval);
  console.log("Users =>", users);
  console.log("Session=>", session);
  // const users = await prisma.user.deleteMany();
  // console.log("Delted", users);
  return (
    <div className="flex items-center justify-center">
      <div className="bg-sky-700 text-slate-100 p-2 rounded shadow grid grid-cols-2 mt-9">
        <p>Name:</p>
        <p>{session?.user.name}</p>
        <p>Email:</p>
        <p>{session?.user.email}</p>
      </div>
      <div>
        {users?.map((user: any) => {
          return (
            <>
              <div className="bg-sky-700 text-slate-100 p-2 rounded shadow grid grid-cols-2 mt-9">
                <p>Name:</p>
                <p>{user?.name}</p>
                <p>Email:</p>
                <p>{user?.email}</p>
                <p>Expires At:</p>
                <p>{user?.role}</p>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default page;
