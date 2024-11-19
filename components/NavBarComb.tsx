"use client";

import React from "react";
import { AdminNavbar } from "./adminnavbar";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";

function NavBarComb() {
  const c = usePathname();
  return <div>{c.startsWith("/admin") ? <AdminNavbar /> : <Navbar />}</div>;
}

export default NavBarComb;
