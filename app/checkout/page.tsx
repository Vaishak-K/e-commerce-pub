import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import CheckoutView from "./_components/CheckoutView";

async function page() {
  const session = await getServerSession(authOptions);
  const useradd = await prisma.user.findUnique({
    where: {
      email: String(session?.user?.email),
    },
    select: {
      address: true,
    },
  });
  return (
    <div>
      <CheckoutView address={useradd?.address} />
    </div>
  );
}

export default page;
