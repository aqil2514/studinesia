import Link from "next/link";
import { cn } from "@/lib/utils";
import MainLogo from "@/components/atoms/images/MainLogo";

export default function Footer() {
  return (
    <footer
      className={cn(
        "border-t border-gray-200 bg-gray-50 dark:bg-gray-900 dark:border-gray-700",
        "py-6 px-4 sm:px-8"
      )}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <MainLogo withLinks="/" />

        {/* Navigation Links */}
        <nav className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
          <Link
            href="/about"
            className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/privacy"
            className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            Privacy Policy
          </Link>
        </nav>

        {/* Copyright */}
        <p className="text-xs text-gray-400 dark:text-gray-500">
          © {new Date().getFullYear()} Studinesia. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
