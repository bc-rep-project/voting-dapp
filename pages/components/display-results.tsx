
import DisplayResults from "@/components/DisplayResults";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DisplayResultsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-4">
      <DisplayResults />
      <div className="flex justify-between w-full">
        <Link href="/components/voting-interface">
          <Button className="px-6 py-3 text-lg">Back</Button>
        </Link>
      </div>
    </div>
  );
}
