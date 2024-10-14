
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HomeIcon, UserPlusIcon, VoteIcon, InfoIcon } from "lucide-react";
import { BarChart2 as TallyIcon } from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`flex ${isOpen ? "w-64" : "w-20"} transition-width duration-300 bg-gray-800 text-white h-screen`}>
      <div className="flex flex-col items-center w-full">
        <Button onClick={toggleSidebar} className="mt-4">
          {isOpen ? "Collapse" : "Expand"}
        </Button>
        <nav className="mt-10">
          <ul className="space-y-4">
            <li>
              <a href="#home" className="flex items-center space-x-2">
                <HomeIcon className="h-6 w-6" />
                {isOpen && <span>Home</span>}
              </a>
            </li>
            <li>
              <a href="#register" className="flex items-center space-x-2">
                <UserPlusIcon className="h-6 w-6" />
                {isOpen && <span>Register Voter</span>}
              </a>
            </li>
            <li>
              <a href="#vote" className="flex items-center space-x-2">
                <VoteIcon className="h-6 w-6" />
                {isOpen && <span>Cast Vote</span>}
              </a>
            </li>
            <li>
              <a href="#tally" className="flex items-center space-x-2">
                <TallyIcon className="h-6 w-6" />
                {isOpen && <span>Tally Votes</span>}
              </a>
            </li>
            <li>
              <a href="#info" className="flex items-center space-x-2">
                <InfoIcon className="h-6 w-6" />
                {isOpen && <span>Candidate Info</span>}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
