import React from "react";

import styles from "./button.module.scss";

export interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  icon?: string;
}

export default function Button({ children, onClick, icon }: ButtonProps) {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles["btn-primary"]}`}>
      {icon ? <span className="material-icons mr-4">{icon}</span> : null}
      {children}
    </button>
  );
}
