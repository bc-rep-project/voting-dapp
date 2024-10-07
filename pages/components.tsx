
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ComponentsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-4">
      <h1 className="text-4xl font-bold mb-4">Components</h1>
      <Link href="/components/connect-wallet">
        <Button className="px-6 py-3 text-lg">Connect Wallet</Button>
      </Link>
      <Link href="/components/register-voter">
        <Button className="px-6 py-3 text-lg">Register Voter</Button>
      </Link>
      <Link href="/components/voting-interface">
        <Button className="px-6 py-3 text-lg">Voting Interface</Button>
      </Link>
      <Link href="/components/display-results">
        <Button className="px-6 py-3 text-lg">Display Results</Button>
      </Link>
    </div>
  );
}
