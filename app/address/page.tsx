import AddressView from "./_components/AddressView";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

async function page() {
  const session = await getServerSession(authOptions);
  console.log("Session", session?.user?.email);
  const Add = await prisma.user.findUnique({
    where: {
      email: String(session?.user?.email),
    },
    select: {
      address: true,
    },
  });

  return (
    <div className="">
      <AddressView Add={Add?.address} />
    </div>
  );
}

export default page;
