
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-4">
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
      <Link href="/connect-wallet">
        <Button className="px-6 py-3 text-lg">Connect Wallet</Button>
      </Link>
      <Link href="/register-voter">
        <Button className="px-6 py-3 text-lg">Register Voter</Button>
      </Link>
      <Link href="/voting-interface">
        <Button className="px-6 py-3 text-lg">Voting Interface</Button>
      </Link>
      <Link href="/display-results">
        <Button className="px-6 py-3 text-lg">Display Results</Button>
      </Link>
    </div>
  );
}
