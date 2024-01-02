import React from "react";

import "./styles/index.css";

export default function Overlay({
  onClick,
  children,
}: {
  onClick?: () => void;
  children?: React.ReactNode;
}) {
  return (
    <div onClick={onClick} className={"overlay"}>
      {children}
    </div>
  );
}
