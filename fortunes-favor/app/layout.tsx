import type { Metadata } from "next";
import "./globals.css";
import TopNav from "../components/TopNav";
import { Suspense } from "react";
import { AlertProvider } from "../contexts/AlertContext";
import { Provider } from "@/components/Provider";

export const metadata: Metadata = {
  title: "Fortune's Favor",
  description: "Rules for the worlds okayest roleplaying game",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider>
      <html lang="en">
        <head></head>
        <body className="">
          <AlertProvider>
            <Suspense>
              <div className="fixed top-0 w-full h-20 bg-slate-700 z-50">
                <TopNav />
              </div>
            </Suspense>
            <div className="container mx-auto max-w-screen-xxl flex-grow bg-gray-100 dark:bg-gray-900">
              <div className="mt-20">{children}</div>
            </div>
          </AlertProvider>
        </body>
      </html>
    </Provider>
  );
}
