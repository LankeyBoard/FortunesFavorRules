import Button, { ButtonType } from "@/components/blocks/Inputs/Button";
import Link from "next/link";
import "./globals.css";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl items-center justify-center px-4 py-16">
      <div className="w-full rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-teal-600 dark:text-teal-400">
          404
        </p>
        <h2 className="mb-3 text-3xl font-light tracking-wider text-slate-800 dark:text-slate-100">
          Page not found
        </h2>
        <p className="mb-6 text-base text-slate-600 dark:text-slate-300">
          The page you requested could not be found. It may have moved or no
          longer exists.
        </p>
        <Button buttonType={ButtonType.default} color="amber">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}
