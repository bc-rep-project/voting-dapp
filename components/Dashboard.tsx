
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import "@/components/styles/Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="button-grid">
        <Link href="/components/connect-wallet">
          <Button className="dashboard-button">Connect Wallet</Button>
        </Link>
        <Link href="/components/register-voter">
          <Button className="dashboard-button">Register Voter</Button>
        </Link>
        <Link href="/components/voting-interface">
          <Button className="dashboard-button">Voting Interface</Button>
        </Link>
        <Link href="/components/display-results">
          <Button className="dashboard-button">Display Results</Button>
        </Link>
        <Link href="/components/view-voter">
          <Button className="dashboard-button">View Voter</Button>
        </Link>
        <Link href="/app/view-all-voters">
          <Button className="dashboard-button">View All Voters</Button>
        </Link>
      </div>
    </div>
  );
}
