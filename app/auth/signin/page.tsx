// app/auth/signin/page.tsx

"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

const SignInPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (provider: string) => {
    try {
      setLoading(true);
      const result = await signIn(provider, {
        callbackUrl: window.location.origin, // Or specify your desired callback URL
      });

      if (result?.error) {
        setError("Authentication failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred during sign-in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        <h1 className="text-2xl font-semibold text-gray-700 mb-6">Sign In</h1>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          onClick={() => handleSignIn("google")}
          disabled={loading}
          className="w-full bg-blue-500 text-white py-3 px-4 rounded-md text-lg font-semibold transition-colors hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? "Signing in..." : "Sign in with Google"}
        </button>

        {/* Add other providers as needed */}
      </div>
    </div>
  );
};

export default SignInPage;
