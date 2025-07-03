"use client";

import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

function Header() {
  return (
    <header className="w-full border-b bg-white px-6 py-4 dark:bg-black">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="logo" width={30} height={30} />
          <span className="text-xl font-bold text-black dark:text-white">InterviewGenius</span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden gap-6 text-sm font-medium text-gray-600 md:flex dark:text-gray-300">
          <Link href="#">Features</Link>
          <Link href="#">Pricing</Link>
          <Link href="#">Contact</Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <Link
            href="#"
            className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            Book a call
          </Link>

          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
}

export default Header;
