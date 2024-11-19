"use client";

import React, { useEffect, useState } from "react";
import { prisma } from "@/lib/prisma";
import AdminOrderProduct from "./AdminOrderProduct";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { OrderApprovals } from "../../_components/ProductRel/_actions/OrderApprovals";
import { Button } from "@nextui-org/button";
import { IncludeApproved } from "./IncludeApproved";

const APPROVALS_PER_PAGE = 5;

function Page({ orderval, products }: { orderval: any; products: any }) {
  const [orderVal, setOrderVal] = useState(orderval);
  const { data: session } = useSession();
  const [currentPage, setCurrentPage] = useState(1);
  const [id, setID] = useState<any>("");
  const totalOrders = orderVal.length;
  const startIndex = (currentPage - 1) * APPROVALS_PER_PAGE;
  const totalPages = Math.ceil(totalOrders / APPROVALS_PER_PAGE);
  const [approved, setApproved] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  const currentApprovals = orderVal.slice(
    startIndex,
    startIndex + APPROVALS_PER_PAGE
  );

  useEffect(() => {
    const ChangeAvailable = async () => {
      id ? await OrderApprovals(id) : "";
    };
    ChangeAvailable();
    setID("");
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await IncludeApproved(approved);
        setOrderVal(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [approved]);

  function handleAvailChange(data: any) {
    setID(data?.id);
  }

  if (!session) {
    return (
      <div className="w-full mx-auto p-6 text-center">
        <h1 className="text-2xl sm:text-4xl font-bold pb-4">Access Denied</h1>
        <h2 className="text-sm sm:text-lg text-gray-600 pb-2">
          You must be logged in to view your orders.
        </h2>
        <p className="text-sm sm:text-md text-gray-500">
          Please{" "}
          <a href="/api/auth/signin" className="text-blue-500 underline">
            log in
          </a>{" "}
          to your account.
        </p>
      </div>
    );
  }

  const renderedOrders = orderval ? (
    currentApprovals.map((ord: any) => (
      <section
        key={ord.id}
        className="border-2 border-gray-300 rounded-lg shadow-md text-center mb-4 p-4 sm:p-6"
      >
        {ord?.approveOrder ? (
          <h1 className="text-success-400 text-lg sm:text-xl font-semibold">
            This Order is Approved
          </h1>
        ) : (
          <h1 className="text-danger-400 text-lg sm:text-xl font-semibold">
            Order is waiting to be Approved
          </h1>
        )}
        <h1 className="text-lg sm:text-xl font-medium">Address</h1>
        <h1 className="text-sm sm:text-lg">Name: {ord?.address?.name}</h1>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-x-2 justify-center">
          <h1>{ord?.address?.address1},</h1>
          <h1>{ord?.address?.address2},</h1>
          <h1>{ord?.address?.pincode}</h1>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-6 my-6 py-6">
          <AdminOrderProduct quantity={ord.quantity} products={products} />
          <div className="flex flex-col gap-4 sm:gap-8">
            <h1 className="text-sm sm:text-lg">
              Approve Order:
              <Input
                type="checkbox"
                defaultChecked={ord?.approveOrder}
                onChange={() => handleAvailChange(ord)}
              />
            </h1>
            <h1 className="text-lg sm:text-xl font-semibold">
              Total: Rs.{ord.price.toFixed(2)}
            </h1>
          </div>
        </div>
      </section>
    ))
  ) : (
    <p className="text-center text-gray-500">No orders found.</p>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-center text-3xl sm:text-4xl font-bold pb-4">
        Orders
      </h1>
      <div className="flex justify-center sm:justify-start gap-2 sm:gap-4 pb-6">
        <Input
          type="checkbox"
          defaultChecked={approved}
          onChange={() => setApproved(!approved)}
        />
        <h2 className="text-sm sm:text-lg text-gray-600 pb-2">
          Click to View Approved Orders
        </h2>
      </div>
      {renderedOrders}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="w-full sm:w-auto mb-2 sm:mb-0 disabled:bg-foreground-400 bg-primary-400 hover:bg-foreground-400 transition duration-300"
        >
          Previous
        </Button>
        <span className="text-sm sm:text-md">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="w-full sm:w-auto mt-2 sm:mt-0 disabled:bg-foreground-400 bg-primary-400 hover:bg-foreground-400 transition duration-300"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default Page;
