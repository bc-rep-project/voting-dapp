
import Link from "next/link";
import { Button } from "@/components/ui/button";
import "@/components/components.css";

export default function ComponentsPage() {
  return (
    <div className="container">
        <h1 className="title">Components</h1>
        <Link href="/components/connect-wallet">
            <Button className="button">Connect Wallet</Button>
        </Link>
        <Link href="/components/register-voter">
            <Button className="button">Register Voter</Button>
        </Link>
        <Link href="/components/voting-interface">
            <Button className="button">Voting Interface</Button>
        </Link>
        <Link href="/components/display-results">
            <Button className="button">Display Results</Button>
        </Link>
    </div>
  );
}
