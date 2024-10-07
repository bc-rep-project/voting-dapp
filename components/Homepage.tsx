
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Homepage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Voting DApp</h1>
      <p className="text-lg mb-8">A decentralized application for secure and transparent voting.</p>
      <Link href="/dashboard">
        <Button className="px-6 py-3 text-lg">Get Started</Button>
      </Link>
    </div>
  );
}
