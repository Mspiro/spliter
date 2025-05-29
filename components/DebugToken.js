'use client';

import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";

export default function DebugToken() {
  const { isSignedIn, getToken } = useAuth();

  useEffect(() => {
    const fetchToken = async () => {
      if (isSignedIn) {
        const token = await getToken({ template: "convex" });
        console.log("🔐 Clerk JWT Token:", token);
      }
    };
    fetchToken();
  }, [isSignedIn]);

  return null; // nothing to render
}
