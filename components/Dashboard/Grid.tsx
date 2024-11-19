"use client";

import React, { useEffect, useState } from "react";
import StatCards from "./StatCards";
import { UsageRadar } from "./UsageRadar";
import RecentTransactions from "./RecentTransactions";
import { prisma } from "@/lib/prisma"; // Assuming prisma is being used
import ActivityGraph from "./ActivityGraph";
import { GetOrderData } from "./functions/GetOrderData";

const Grid = () => {
  // State to store the data after async operation
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // To track loading state

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetOrderData();
      await setData(data);
      setLoading(false); // Stop loading once data is fetched
    };

    fetchData(); // Call the async function
  }, []); // Empty dependency array to run on mount

  if (loading) {
    return <div>Loading...</div>; // Optionally, show loading state while data is being fetched
  }

  return (
    <div className="px-4">
      <StatCards />
      <ActivityGraph data={data} />
      {/* <UsageRadar /> */}
      <RecentTransactions />
    </div>
  );
};

export default Grid;
