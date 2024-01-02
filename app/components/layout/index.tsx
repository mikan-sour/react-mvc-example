import React from "react";
import Header from "./header";

import "./styles/index.css";

export default function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <main className="layout">
      <Header />
      <section>{children}</section>
    </main>
  );
}
