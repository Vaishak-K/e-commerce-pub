import React from "react";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import OrderProduct from "./_components/OrderProduct";
import { Button } from "@nextui-org/button";
import RenderedOrders from "./_components/RenderedOrders";

async function Page() {
  const products = await prisma.product.findMany();
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h1 className="text-2xl md:text-4xl font-bold pb-4">Access Denied</h1>
        <h2 className="text-sm md:text-lg text-gray-600 pb-2">
          You must be logged in to view your orders.
        </h2>
        <p className="text-sm md:text-md text-gray-500">
          Please{" "}
          <a href="/api/auth/signin" className="text-blue-500 underline">
            log in
          </a>{" "}
          to your account.
        </p>
      </div>
    );
  }

  const orderval = await prisma.user.findUnique({
    where: {
      email: String(session?.user?.email),
    },
    include: {
      order: true,
      address: true,
    },
  });

  let c;
  const renderedOrders = orderval ? (
    orderval.order.map(async (ord: any) => {
      c = await prisma.address.findUnique({
        where: {
          id: ord?.addressid,
        },
      });
      return (
        <section
          key={ord.id}
          className="border-2 border-gray-300 rounded-lg shadow-md text-center mb-4 p-4 sm:p-6"
        >
          {ord?.approveOrder ? (
            <h1 className="text-success-400 text-lg sm:text-xl font-semibold ">
              Your Order has been Approved
            </h1>
          ) : (
            <h1 className="text-danger-400 text-lg sm:text-xl font-semibold">
              Your Order is waiting to be Approved
            </h1>
          )}
          {ord?.approveOrder ? (
            <RenderedOrders ord={ord} products={products} address={c} />
          ) : (
            ""
          )}
          <div className="flex flex-col sm:flex-row justify-between my-6 py-6">
            <OrderProduct quantity={ord.quantity} price={ord.price} />
            <h1 className="text-lg sm:text-xl font-semibold px-5">
              Total: Rs.{ord.price.toFixed(2)}
            </h1>
          </div>
        </section>
      );
    })
  ) : (
    <p className="text-center text-gray-500">No orders found.</p>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-center text-3xl sm:text-4xl font-bold pb-4">
        Your Orders
      </h1>
      <h2 className="text-center text-sm sm:text-lg text-gray-600 pb-2">
        Your orders appear here
      </h2>
      {orderval?.name && (
        <h3 className="text-center text-lg sm:text-xl font-medium pb-4">
          Customer Name: {orderval.name}
        </h3>
      )}
      {renderedOrders}
    </div>
  );
}

export default Page;
