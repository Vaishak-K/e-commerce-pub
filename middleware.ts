import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions"; // Adjust the path if needed

// This is the Next.js middleware
export async function middleware(req: Request) {
  // Get the session from NextAuth

  const session = await getServerSession(authOptions);

  // Define the path to exclude from middleware (auth pages)
  const excludedPaths = ["/auth", "/auth/signin"];

  // Check if the session exists, and if the request is not for an auth-related page
  const { pathname } = new URL(req.url);

  if (!session && !excludedPaths.some((path) => pathname.startsWith(path))) {
    // If no session, redirect to /auth/signin
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  // If the session exists or the page is in the excluded list, continue the request
  return NextResponse.next();
}

// Specify the paths the middleware applies to
export const config = {
  matcher: [
    // Apply to all pages except the /auth and /auth/signin pages
    "/((?!auth).*)",
  ],
};
