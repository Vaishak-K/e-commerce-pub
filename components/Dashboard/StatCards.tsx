"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import { prisma } from "@/lib/prisma";
import { getStatsData } from "./functions/GetStatsData";

const StatCards = () => {
  const [db, setDb] = useState<any>(null);
  const [fullorders, setFullOrders] = useState<any[]>([]);
  const [toApprove, setToApprove] = useState<any>(null);
  const [lastOrderUpdate, setLastOrderUpdate] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const dbData = await getStatsData(1);

      const fullOrdersData: any = await getStatsData(2);
      const toApproveData = await getStatsData(3);

      const lastOrderUpdateData = await getStatsData(4);

      await setDb(dbData);
      await setFullOrders(fullOrdersData);
      await setToApprove(toApproveData);
      await setLastOrderUpdate(lastOrderUpdateData);
    };

    fetchData();
  }, []);

  if (!db || !fullorders || !toApprove || !lastOrderUpdate) {
    return <div>Loading...</div>;
  }

  let dblength = Number(fullorders.length - toApprove?._count?.approveOrder);

  return (
    <div className="grid sm:grid-cols-12">
      <Card
        title="Total Order Value"
        value={`Rs.${db?._sum.price}`}
        pillText="2.75%"
        trend="up"
        period={`Last Updated:${lastOrderUpdate?.updatedAt}`}
        href="/admin"
      />
      <Card
        title="No of Orders so far"
        value={String(fullorders.length)}
        pillText="1.01%"
        trend="down"
        period={`Last Updated:${lastOrderUpdate?.updatedAt}`}
        href="/orderapprove"
      />
      <Card
        title="No.of Orders to Approve"
        value={String(toApprove?._count?.approveOrder)}
        pillText="60.75%"
        trend="up"
        period={`Last Updated:${lastOrderUpdate?.updatedAt}`}
        href="/customer"
      />
    </div>
  );
};

const Card = ({
  title,
  value,
  pillText,
  trend,
  period,
  href,
}: {
  title: string;
  value: string;
  pillText: string;
  trend: "up" | "down";
  period: string;
  href: any;
}) => {
  return (
    <div className="col-span-4 p-4 rounded border border-stone-300">
      <div className="flex mb-8 items-start justify-between">
        <Link href={href}>
          <div>
            <h3 className="text-stone-500 mb-2 text-sm">{title}</h3>
            <p className="text-3xl font-semibold">{value}</p>
          </div>

          <span
            className={`text-xs flex items-center gap-1 font-medium px-2 py-1 rounded ${
              trend === "up"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {trend === "up" ? <FiTrendingUp /> : <FiTrendingDown />} {pillText}
          </span>
        </Link>
      </div>

      <p className="text-xs text-stone-500">{period}</p>
    </div>
  );
};

export default StatCards;
