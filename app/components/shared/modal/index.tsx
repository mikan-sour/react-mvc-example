import React from "react";

import "./styles/index.css";

export default function Modal({
  headerText,
  children,
}: {
  headerText: string;
  children?: React.ReactNode;
}) {
  return (
    <article className="modalWrapper">
      <header>
        <h3>{headerText}</h3>
      </header>
      <section>{children}</section>
    </article>
  );
}
