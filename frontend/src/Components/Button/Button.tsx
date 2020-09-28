import React from "react";

import styles from "./button.module.scss";

export interface ButtonProps {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  icon?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  theme?: string;
  isLarge?: boolean;
}

export default function Button({
  children,
  type = "button",
  theme = "default",
  onClick,
  icon,
  disabled = false,
  isLarge = false,
}: ButtonProps) {

  let btnClass = "";
  switch (theme) {
    case "primary":
      btnClass = styles["btn-primary"];
  }

  if(isLarge) {
    btnClass += ` ${styles["btn-lg"]}`
  }

  return (
    <button
      onClick={onClick}
      className={`${styles.btn} ${btnClass}`}
      disabled={disabled === true}
      type={type}
    >
      {icon ? <span className="material-icons mr-4">{icon}</span> : null}
      {children}
    </button>
  );
}
