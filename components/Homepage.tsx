
"use client";

import Link from "next/link";
import { Button } from "../components/ui/button";

export default function Homepage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen glass">
      <h1 className="text-4xl font-bold mb-4 text-center text-white text-modern">Welcome to the Voting DApp</h1>
      <p className="text-lg mb-8 text-center text-white text-modern">A decentralized application for secure and transparent voting.</p>
      <Link href="/components">
        <Button className="button-modern">Get Started</Button>
      </Link>
    </div>
  );
}
