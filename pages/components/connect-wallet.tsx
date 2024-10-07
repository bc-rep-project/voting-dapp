
import ConnectWallet from "@/components/ConnectWallet";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ConnectWalletPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-4">
      <ConnectWallet />
      <Link href="/components/register-voter">
        <Button className="px-6 py-3 text-lg">Next</Button>
      </Link>
    </div>
  );
}
