
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HomeIcon, UserPlusIcon, VoteIcon, InfoIcon } from "lucide-react";
import { BarChart2 as TallyIcon } from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Button onClick={toggleSidebar} className="fixed top-4 left-4 z-50 bg-transparent sm:hidden">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </Button>
      <div className={`fixed sm:relative flex ${isOpen ? "w-64" : "w-20 sm:w-20"} transition-width duration-300 bg-gray-800 text-white h-screen`}>
        <div className="flex flex-col items-center w-full">
          <Button onClick={toggleSidebar} className="mt-4 sm:block hidden">
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
                <a href="/register-voter" className="flex items-center space-x-2">
                  <UserPlusIcon className="h-6 w-6" />
                  {isOpen && <span>Register Voter</span>}
                </a>
              </li>
              <li>
                <a href="/cast-vote" className="flex items-center space-x-2">
                  <VoteIcon className="h-6 w-6" />
                  {isOpen && <span>Cast Vote</span>}
                </a>
              </li>
              <li>
                <a href="/tally-votes" className="flex items-center space-x-2">
                  <TallyIcon className="h-6 w-6" />
                  {isOpen && <span>Tally Votes</span>}
                </a>
              </li>
              <li>
                <a href="/candidate-info" className="flex items-center space-x-2">
                  <InfoIcon className="h-6 w-6" />
                  {isOpen && <span>Candidate Info</span>}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
