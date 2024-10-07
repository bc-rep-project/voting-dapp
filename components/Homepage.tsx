
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Homepage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 transition-all duration-500 ease-in-out">
      <h1 className="text-4xl font-bold mb-4 text-center text-white">Welcome to the Voting DApp</h1>
      <p className="text-lg mb-8 text-center text-white">A decentralized application for secure and transparent voting.</p>
      <Link href="/components">
        <Button className="px-6 py-3 text-lg bg-white text-green-500 hover:bg-green-500 hover:text-white transition-all duration-300 ease-in-out">Get Started</Button>
      </Link>
    </div>
  );
}
