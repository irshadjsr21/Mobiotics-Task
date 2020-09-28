import React from "react";

import styles from "./input.module.scss";

export interface InputBoxProps {
  name: string;
  hint?: string;
  type: string;
  value: string;
  error: string;
  label: string;
  handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
}

export default function InputBox({
  name,
  hint,
  error,
  label,
  type,
  value,
  handleInput,
  className,
}: InputBoxProps) {
  return (
    <div className={`${styles["input-container"]} ${className}`}>
      <label htmlFor={name} className={styles["input-label"]}>
        {label}
      </label>
      {hint ? <small className="mt-2 text-mute">{hint}</small> : null}
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        className={
          error ? `${styles["input-box"]} ${styles["input-box-invalid"]}` : styles["input-box"]
        }
        onChange={handleInput}
      />
      {error ? <small className="text-danger">{error}</small> : null}
    </div>
  );
}
