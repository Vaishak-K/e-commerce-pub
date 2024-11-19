"use client";

import { useCart } from "@/app/products/_state/CartValues";
import { Input } from "@nextui-org/input";
import { Kbd } from "@nextui-org/kbd";
import { NavbarItem } from "@nextui-org/navbar";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import React, { useEffect, useMemo, useRef, useState } from "react";

function SearchInput({ db }: any) {
  const [searchinput, setSearchinput] = useState("");
  const [filteredItem, setFilteredItem] = useState({ itemname: "" });
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { products } = useCart();

  const filtered = useMemo(
    () =>
      searchinput
        ? products?.filter((data: any) =>
            data.name.toLowerCase().includes(searchinput.toLowerCase())
          )
        : [{ name: "Search Something" }],
    [searchinput, products]
  );

  function handleFilteredItem(item: any) {
    setFilteredItem(item);
    setSearchinput("");
    setIsOpen(false);
  }

  useEffect(() => {
    // Handle clicks outside the dropdown
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    // Handle key presses
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div>
      <NavbarItem>
        <Input
          // type="text"
          autoComplete="false"
          value={searchinput}
          onChange={(e) => setSearchinput(e.target.value)}
          onFocus={() => setIsOpen(true)}
          // className="hidden lg:grid content-end w-11/12"
          aria-label="Search"
          classNames={{
            inputWrapper: "bg-default-100",
            input: "text-sm",
          }}
          endContent={
            <Kbd className="hidden lg:inline-block" keys={["command"]}>
              K
            </Kbd>
          }
          labelPlacement="outside"
          placeholder="Search..."
          className="w-full"
          startContent={
            <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
          }
          type="search"
        />
      </NavbarItem>
      <NavbarItem className="absolute bg-inherit w-full h-full z-50 ">
        {isOpen && (
          <div
            ref={dropdownRef}
            className="backdrop-blur-lg bg-gray-300/60 rounded-lg p-2"
          >
            {filtered.length !== 0 ? (
              filtered.slice(0, 5)?.map((item: any, i: any) =>
                item ? (
                  <Link
                    key={i}
                    href={`/products/${item?.id ? item?.id : ""}`}
                    className="flex w-full justify-between px-2 py-1"
                    onClick={() => handleFilteredItem(item)} // Close dropdown on item click
                  >
                    <h1>{(item?.name).substring(0, 25)}</h1>
                    {item.imagePath ? (
                      <Image
                        src={item?.imagePath}
                        alt="Prod img"
                        width={50}
                        height={30}
                      />
                    ) : (
                      ""
                    )}
                  </Link>
                ) : (
                  ""
                )
              )
            ) : (
              <h1>Search Result not Found</h1>
            )}
          </div>
        )}
      </NavbarItem>
    </div>
  );
}

export default SearchInput;
