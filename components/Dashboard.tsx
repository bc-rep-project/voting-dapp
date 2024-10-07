
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 ease-in-out space-y-4">
      <h1 className="text-4xl font-bold mb-4 text-white">Dashboard</h1>
      <Link href="/connect-wallet">
        <Button className="px-6 py-3 text-lg bg-white text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out">Connect Wallet</Button>
      </Link>
      <Link href="/register-voter">
        <Button className="px-6 py-3 text-lg bg-white text-purple-500 hover:bg-purple-500 hover:text-white transition-all duration-300 ease-in-out">Register Voter</Button>
      </Link>
      <Link href="/voting-interface">
        <Button className="px-6 py-3 text-lg bg-white text-pink-500 hover:bg-pink-500 hover:text-white transition-all duration-300 ease-in-out">Voting Interface</Button>
      </Link>
      <Link href="/display-results">
        <Button className="px-6 py-3 text-lg bg-white text-green-500 hover:bg-green-500 hover:text-white transition-all duration-300 ease-in-out">Display Results</Button>
      </Link>
    </div>
  );
}
