import React from "react";

import './styles/index.css';
const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (
  props
) => {
  return <button {...props}>{props.children}</button>;
};

export default Button
