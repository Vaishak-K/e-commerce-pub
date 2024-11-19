"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "@/components/theme-switch";
import { SearchIcon, CartIcon, Logo } from "@/components/icons";
import { useEffect, useState } from "react";

import { useCart } from "@/app/products/_state/CartValues";
import { signIn, signOut, useSession } from "next-auth/react";

import { UpdateCart } from "@/app/actions/UpdateProd";
import { usePathname } from "next/navigation";

export const AdminNavbar = () => {
  const { data: session } = useSession();
  const { cart, quantity, val, setCartQuantity, setQuantity, setVal, total } =
    useCart();
  const [isOn, setisOn] = useState(true);
  const [inputval, setInputVal] = useState("");
  const [a, setA] = useState(0);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputVal(e.target.value);
  }
  function handleSignout() {
    setA(1);
  }
  let c = usePathname();
  useEffect(() => {
    const changeProd = async () => {
      if (a === 1) {
        const a = await UpdateCart(cart, quantity, val, total);
        setQuantity({});
        setCartQuantity(0);
        setVal([]);
        await signOut();
        await setA(0);
      }
    };
    changeProd();
  }, [a]);
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setisOn(!isOn);
    }
  };
  // const { cart } = useCart();
  const searchInput = (
    <Input
      onFocusChange={() => setisOn(!isOn)}
      onChange={handleChange}
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
      className="w-96"
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent
        className="basis-1/5 sm:basis-full hidden sm:block"
        justify="start"
      >
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">ACME</p>
          </NextLink>
        </NavbarBrand>
        <div className="flex w-full justify-center gap-x-12">
          <NavbarItem>
            <NextLink
              className={clsx(
                linkStyles({ color: "foreground" }),
                "data-[active=true]:text-primary data-[active=true]:font-medium"
              )}
              color="foreground"
              href="/admin"
            >
              Dashboard
            </NextLink>
          </NavbarItem>
          <NavbarItem>
            <NextLink
              className={clsx(
                linkStyles({ color: "foreground" }),
                "data-[active=true]:text-primary data-[active=true]:font-medium"
              )}
              color="foreground"
              href="/admin/products"
            >
              Products
            </NextLink>
          </NavbarItem>
          <NavbarItem>
            <NextLink
              className={clsx(
                linkStyles({ color: "foreground" }),
                "data-[active=true]:text-primary data-[active=true]:font-medium"
              )}
              color="foreground"
              href="/admin/orderapprove"
            >
              Order Approvals
            </NextLink>
          </NavbarItem>
        </div>
      </NavbarContent>

      <NavbarItem>
        {session ? (
          <Dropdown className="sm:block hidden">
            <DropdownTrigger>
              <Button
                className="sm:block hidden text-background"
                variant="solid"
                color="success"
              >
                Hello,Admin {session?.user?.name}!
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="admin" href="/admin">
                Your Dashboard
              </DropdownItem>
              <DropdownItem key="adminpro" href="/admin/products">
                Product Inventory
              </DropdownItem>
              <DropdownItem key="orderapprove" href="/admin/orderapprove">
                Order Approvals
              </DropdownItem>
              <DropdownItem key="user" href="/" className="text-primary-500">
                Switch to User
              </DropdownItem>
              <DropdownItem
                key="delete"
                className="text-danger"
                color="danger"
                onClick={handleSignout}
              >
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <Button className="sm:block hidden" onClick={() => signIn("google")}>
            Login
          </Button>
        )}
      </NavbarItem>
      <NavbarItem className="hidden sm:flex gap-2">
        <ThemeSwitch />
      </NavbarItem>

      {/* Mobile */}

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />

        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          <NavbarMenuItem className="text-center text-lg font-medium">
            {session
              ? `Hi, Admin ${session?.user?.name}!!`
              : "User not Logged in"}
          </NavbarMenuItem>
          <NavbarMenuItem key="home">
            <Link color={"primary"} href="/admin" size="lg">
              Home
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem key="products">
            <Link color={"primary"} href="/admin/products" size="lg">
              Products
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem key="approve">
            <Link color={"primary"} href="/admin/orderapprove" size="lg">
              Product Approvals
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem key="switchtouser">
            <Link color={"danger"} href="/" size="lg">
              Switch to User
            </Link>
          </NavbarMenuItem>
          {session ? (
            <Button color="danger" onClick={handleSignout}>
              Logout
            </Button>
          ) : (
            <Button onClick={() => signIn("google")}>Login</Button>
          )}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
