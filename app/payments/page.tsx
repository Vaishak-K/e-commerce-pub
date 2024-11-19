"use client";

import { Button } from "@nextui-org/button";
import React, { useEffect, useState } from "react";
import { useCart } from "../products/_state/CartValues";
import { AddOrder } from "../actions/order";

function Page() {
  const {
    cart,
    total,
    quantity,
    selectedAddress,
    val,
    setQuantity,
    setVal,
    setTotal,
    setSelectedAddress,
    setCartQuantity,
  } = useCart();

  const [change, setChange] = useState(0);

  const handleSubmit = async () => {
    try {
      // Call the async function to add order
      const result: any = await AddOrder(quantity, total, selectedAddress, val);

      // If order is successful, reset state

      setSelectedAddress("");
      setQuantity({});
      setVal([]);
      setTotal(0);
      setCartQuantity(0);
      console.log("Order placed successfully.");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  useEffect(() => {
    // You might want to add side effects related to the change state
    if (change === 1) {
      // Example: fetch some data or trigger some effects if needed
      console.log(
        "Order change triggered, but async logic should be in handleSubmit."
      );
    }
  }, [change]);

  console.log("Quantity:", quantity);
  console.log("Value:", val);
  console.log("Total:", total);
  console.log("Selected Address", selectedAddress);

  return (
    <div>
      <h1 className="text-center text-2xl font-bold">Payments</h1>
      <h1 className="text-center text-xl font-semibold">
        Payment Gateway can be integrated here
      </h1>
      <h1 className="text-center text-xl font-semibold pt-8">
        Current Options available are :
      </h1>
      <div className="flex flex-col">
        <div className="flex justify-center">
          <input type="radio" value="COD" />
          <label htmlFor="COD" id="COD" className="text-lg font-medium">
            Cash on Delivery
          </label>
        </div>
        <Button onClick={handleSubmit}>Confirm Order</Button>
      </div>
    </div>
  );
}

export default Page;
