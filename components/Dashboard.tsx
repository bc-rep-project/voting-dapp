
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import "@/components/ui/modern-components.css";

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 ease-in-out space-y-4">
      <h1 className="text-4xl font-bold mb-4 text-white text-modern">Dashboard</h1>
      <Link href="/connect-wallet">
        <Button className="button-modern">Connect Wallet</Button>
      </Link>
      <Link href="/register-voter">
        <Button className="button-modern">Register Voter</Button>
      </Link>
      <Link href="/voting-interface">
        <Button className="button-modern">Voting Interface</Button>
      </Link>
      <Link href="/display-results">
        <Button className="button-modern">Display Results</Button>
      </Link>
    </div>
  );
}
