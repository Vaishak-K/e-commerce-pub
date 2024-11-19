"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import React from "react";

import { useFormState } from "react-dom";
import { AddAddress, UpdateAddress } from "@/app/actions/FetchAddress";
import { usePathname, useRouter } from "next/navigation";

function AddressForm({ address }: { address?: any }) {
  const c = usePathname();
  console.log("pathname", c);
  const [error, action] = useFormState(
    address == null
      ? AddAddress.bind(null, c)
      : UpdateAddress.bind(null, address?.id, c),
    {}
  );
  const router = useRouter();
  console.log("Phone", address?.phone);
  return (
    <div>
      <form className="grid grid-cols-2 gap-y-4" action={action}>
        <label htmlFor="name">Name:</label>
        <div className="flex flex-col">
          <Input
            type="text"
            name="name"
            id="name"
            defaultValue={address?.name || ""}
          />
          {error?.name && (
            <div className="text-destructive font-normal text-base">
              {error?.name}
            </div>
          )}
        </div>

        <label htmlFor="address1">Address (1st Line):</label>
        <div className="flex flex-col">
          <Input
            type="text"
            name="address1"
            id="address1"
            defaultValue={address?.address1 || ""}
          />
          {error?.address1 && (
            <div className="text-destructive font-normal text-base">
              {error?.address1}
            </div>
          )}
        </div>

        <label htmlFor="address2">Address (2nd Line):</label>
        <div className="flex flex-col">
          <Input
            type="text"
            name="address2"
            id="address2"
            defaultValue={address?.address2 || ""}
          />
          {error?.address2 && (
            <div className="text-destructive font-normal text-base">
              {error?.address2}
            </div>
          )}
        </div>

        <label htmlFor="phone">Phone Number:</label>
        <div className="flex flex-col">
          <Input
            type="text"
            name="phone"
            id="phone"
            defaultValue={address ? String(Number(address?.phonenumber)) : ""}
          />
          {error?.phone && (
            <div className="text-destructive font-normal text-base">
              {error?.phone}
            </div>
          )}
        </div>
        <label htmlFor="pincode">Pincode:</label>
        <div className="flex flex-col">
          <Input
            type="text"
            name="pincode"
            id="pincode"
            defaultValue={address?.pincode}
          />
          {error?.pincode && (
            <div className="text-destructive font-normal text-base">
              {error?.pincode}
            </div>
          )}
        </div>
        <Button className="justify-start w-10 hover:bg-inherit " type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default AddressForm;
