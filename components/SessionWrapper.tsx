import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import React from "react";

const SessionWrapper = ({
  children,
 
}: {
  children: React.ReactNode;
 
}) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionWrapper;
