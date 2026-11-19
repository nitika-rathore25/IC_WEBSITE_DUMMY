"use client";

import Footer from "@/components/common/footer";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    // <AuthGuard>
      <main className="h-screen flex flex-col">
        {children}
        {/* <Footer /> */}
      </main>
    // </AuthGuard>
  );
}
