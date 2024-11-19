// app/dashboard/page.tsx

"use client"; // Make this page a client component

import withAuth from "@/app//hoc/withAuth";
import { signIn, signOut, useSession } from "next-auth/react";
import { prisma } from "@/lib/prisma"; // Ensure you have a Prisma client instance
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { image } from "@nextui-org/theme";
import Image from "next/image";

const Dashboard: React.FC = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (session) {
        const response = await fetch(`/api/user?email=${session.user?.email}`);
        const data = await response.json();
        console.log("data", data);
        setUser(data);
      }
    };

    fetchUser();
  }, [session]);

  if (!session) return null; // Optionally handle loading state here

  return (
    <div>
      {session ? (
        <>
          <h1>
            Welcome,
            <Image
              src={String(session?.user?.image)}
              alt="image"
              width={100}
              height={100}
              className="rounded-full"
            />{" "}
            {session.user?.name || session.user?.email}!
          </h1>

          <Button className="bg-red-500" onClick={() => signOut()}>
            Sign out
          </Button>
        </>
      ) : (
        <>
          <h1>You are not Logged in</h1>
          <Button onClick={() => signIn("google")}>Sign in with Google</Button>
        </>
      )}
    </div>
  );
};

// Wrap the Dashboard component with the withAuth HOC
export default withAuth(Dashboard);
