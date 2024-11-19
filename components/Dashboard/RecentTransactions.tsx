import React, { useEffect, useState } from "react";
import { FiArrowUpRight, FiDollarSign } from "react-icons/fi";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { getStatsData } from "./functions/GetStatsData";

// Define the type for the orders
type Order = {
  id: string;
  createdAt: Date;
  price: string;
  user: {
    name: string;
  };
};

const RecentTransactions = () => {
  const [orders, setOrders] = useState<any[]>([]);

  // Fetch data inside useEffect
  useEffect(() => {
    const fetchOrders = async () => {
      const fetchedOrders = await getStatsData(5);
      await setOrders(fetchedOrders);
    };

    fetchOrders();
  }, []);
  let orderstoloop = orders.slice(0, 10);
  return (
    <div className="col-span-12 p-4 rounded border border-stone-300">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-1.5 font-medium text-lg">
          <FiDollarSign /> Recent Orders
        </h3>
        <Link
          href="/payments"
          className="text-sm text-teal-500 hover:underline"
        >
          See all
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <TableHead />
          <tbody>
            {orderstoloop.map((order) => (
              <TableRow
                key={order.id}
                paymentId={order.id}
                name={order.user.name}
                date={order.createdAt.toDateString()}
                price={order.price}
                order={1}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TableHead = () => {
  return (
    <thead>
      <tr className="text-sm font-normal text-stone-500">
        <th className="text-start p-1.5">Order ID</th>
        <th className="text-start p-1.5">Name</th>
        <th className="text-start p-1.5">Date</th>
        <th className="text-start p-1.5">Price</th>
        <th className="w-8"></th>
      </tr>
    </thead>
  );
};

const TableRow = ({
  paymentId,
  name,
  date,
  price,
  order,
}: {
  paymentId: string;
  name: string;
  date: string;
  price: string;
  order: number;
}) => {
  return (
    <tr className={order % 2 ? "bg-stone-100 text-sm" : "text-sm"}>
      <td className="p-1.5">
        <Link
          href={`/payments/${paymentId}`}
          className="text-teal-600 underline flex items-center gap-1"
        >
          {paymentId} <FiArrowUpRight />
        </Link>
      </td>
      <td className="p-1.5">{name}</td>
      <td className="p-1.5">{date}</td>
      <td className="p-1.5">{price}</td>
      <td className="w-8"></td>
    </tr>
  );
};

export default RecentTransactions;
