"use client";

import React, { ReactElement, useState } from "react";
import { useCart } from "../../products/_state/CartValues";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import AddressForm from "./AddressForm";
import { add } from "lodash";

function CheckoutView({ address }: { address: any }) {
  const { total, val, selectedAddress, setSelectedAddress } = useCart();
  const [newAdd, setNewAdd] = useState(false);
  console.log("Selected Address", selectedAddress);
  const handleChange = (event: any) => {
    setSelectedAddress(event.target.value);
  };

  return (
    <div className="mx-9 grid sm:grid-cols-4 ">
      <div className="sm:col-span-3 flex flex-col">
        <h1 className="font-semibold text-2xl">Delivery Address</h1>

        <div className="grid cols-2">
          {address ? (
            address?.map((address1: any) => {
              return (
                <>
                  <input
                    type="radio"
                    id={address1?.id}
                    name="Address"
                    value={address1?.id}
                    onChange={handleChange}
                  />
                  <label htmlFor={address?.id}>
                    {" "}
                    <h1>{address1?.name}</h1>
                    <h1>{address1?.address1}</h1>
                    <h1>{address1?.address2}</h1>
                    <h1>{address1?.phone}</h1>
                    <h1>{address1?.pincode}</h1>
                  </label>
                  <br />
                </>
              );
            })
          ) : (
            <h1>No Addresses Found.Please Login</h1>
          )}
        </div>
        {/* <Link href="/address/new">Add a New Address</Link> */}
        <Button onClick={() => setNewAdd(!newAdd)}>Add a New Address</Button>
        <div className={newAdd ? "" : "hidden"}>
          <AddressForm />
        </div>
      </div>

      <div className="flex flex-col border-2 gap-y-8 border-red-500 shadow-2xl h-72 rounded-2xl">
        <div className="grid grid-cols-2 gap-4 text-center pt-4 ">
          <h1>Price ({val.length} Items)</h1>
          <h1>{total}</h1>
          <h1>Delivery Charges </h1>
          <h1 className="text-xl font-medium text-green-500">
            {val.length === 0 ? (
              <span className="text-red-500">No Items</span>
            ) : (
              "FREE"
            )}
          </h1>
        </div>
        <hr className="border-black" />
        <div className="flex flex-col">
          <h1 className="text-center font-semibold text-2xl ">
            Sub Total : {total}
          </h1>
          {val.length === 0 ? (
            <h1 className="text-center font-medium text-xl">
              No items to Checkout
            </h1>
          ) : (
            <Button className="text-center font-medium text-xl">
              <Link href="/payments">Proceed to Payments</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CheckoutView;
