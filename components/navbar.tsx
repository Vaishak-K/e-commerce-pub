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
  DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import SearchInput from "./SearchInput";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { SearchIcon, CartIcon, Logo } from "@/components/icons";
import { useEffect, useState } from "react";
// import { useCart } from "@/components/CartValues";
import { HtmlContext } from "next/dist/server/future/route-modules/app-page/vendored/contexts/entrypoints";
import { useCart } from "@/app/products/_state/CartValues";
import { signIn, signOut, useSession } from "next-auth/react";
import { updateProduct } from "@/app/actions/product";
import { UpdateCart } from "@/app/actions/UpdateProd";
import { usePathname } from "next/navigation";

export const Navbar = () => {
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
      // onKeyDown={handleKeyDown}
      // onKeyUp={handleKeyDown}
      // onFocus={() => setisOn(!isOn)}
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
    <NextUINavbar maxWidth="xl" position="sticky" className="bg-foreground-900">
      <div className="sm:hidden w-full sm:w-0">
        <SearchInput />
      </div>
      <NavbarContent className="sm:basis-full basis-1/5 " justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink
            className="justify-start items-center gap-1 sm:flex hidden text-secondary"
            href="/"
          >
            <Logo />
            <p className="font-bold  text-secondary">ACME</p>
          </NextLink>
        </NavbarBrand>
        <div className="hidden md:flex relative flex-col w-full">
          <SearchInput />
        </div>

        <NavbarItem>
          <NextLink
            className={clsx(
              linkStyles({ color: "secondary" }),
              "data-[active=true]:text-foreground data-[active=true]:font-medium sm:block hidden "
            )}
            color="foreground"
            href="/products"
          >
            Products
          </NextLink>
        </NavbarItem>
      </NavbarContent>

      <NavbarItem className="hidden sm:flex relative items-end ml-auto">
        <Link href="/cart">
          <CartIcon className="text-secondary" />

          <h1 className="absolute left-5 bottom-2 font-bold text-xl text-secondary">
            {cart}
          </h1>
        </Link>
      </NavbarItem>
      <NavbarItem>
        {session ? (
          <Dropdown>
            <DropdownTrigger className="hidden sm:block">
              <Button variant="solid" color="primary">
                Hello {session?.user?.name}!
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="order" href="/order">
                Your Orders
              </DropdownItem>
              <DropdownItem key="address" href="/address">
                Your Addresses
              </DropdownItem>
              <DropdownItem key="cart" href="/cart">
                Cart
              </DropdownItem>
              <DropdownItem
                key="admin"
                href="/admin"
                className="text-primary-500 hover:text-primary-700"
              >
                Switch to Admin
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
          <Button className="hidden sm:block" onClick={() => signIn("google")}>
            Login
          </Button>
        )}
      </NavbarItem>
      <NavbarItem className="hidden sm:flex gap-2">
        <ThemeSwitch />
      </NavbarItem>

      {/* Mobile */}

      <NavbarContent className="sm:hidden basis-1 pl-4 w-full  " justify="end">
        {/* <ThemeSwitch />
        <NavbarItem className="flex sm:hidden relative items-end ml-auto">
          <Link href="/cart">
            <CartIcon />
            <h1 className="absolute left-5 bottom-2 font-bold text-xl">
              {cart}
            </h1>
          </Link>
        </NavbarItem> */}
        <NavbarMenuToggle className="text-background" />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2 pt-4">
          <NavbarMenuItem className="pt-4">
            <Link color="foreground" href="/" size="lg">
              Home
            </Link>
          </NavbarMenuItem>
          <div className="flex flex-col gap-2 ">
            {siteConfig.navMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  color={
                    index === 2
                      ? "primary"
                      : index === siteConfig.navMenuItems.length - 1
                        ? "danger"
                        : "foreground"
                  }
                  href={item?.href}
                  size="lg"
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
          </div>
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

{
  /* <NavbarMenuItem className="pt-6">
<Link color="foreground" href="/" size="lg">
  Home
</Link>
</NavbarMenuItem>
<NavbarMenuItem>
<Link color="foreground" href="/order" size="lg">
  My Orders
</Link>
</NavbarMenuItem>
<NavbarMenuItem>
<Link color="primary" href="/products" size="lg">
  Products
</Link>
</NavbarMenuItem>
<NavbarMenuItem>
<Link color="foreground" href="/cart" size="lg">
  My Cart
</Link>
</NavbarMenuItem>
<NavbarMenuItem>
<Link color="foreground" href="/address" size="lg">
  My Addresses
</Link>
</NavbarMenuItem>
<NavbarMenuItem>
<Link color="danger" href="/order" size="lg">
  Switch to Admin
</Link>
</NavbarMenuItem> */
}
