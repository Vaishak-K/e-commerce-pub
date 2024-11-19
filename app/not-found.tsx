"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NotFound() {
  const router = useRouter();

  const [timeLeft, setTimeLeft] = useState(5); // Set initial time (in seconds)

  useEffect(() => {
    // Check if timeLeft is greater than 0
    if (timeLeft > 1) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1); // Decrease the time left by 1 second
      }, 1000); // Set delay of 1 second

      return () => clearTimeout(timer); // Clean up the timer on unmount
    } else {
      router.push("/"); // Redirect when time is up
    }
  }, [timeLeft, router]);

  return (
    <div>
      <h1 className="text-center text-5xl font-bold">
        Your requested page is not found
      </h1>
      <p className="text-center text-2xl font-medium">
        If you are not redirected in {timeLeft} seconds, click&nbsp;
        <Link href="/" className="text-blue-600 underline underline-offset-2">
          here
        </Link>
        .
      </p>
    </div>
  );
}
