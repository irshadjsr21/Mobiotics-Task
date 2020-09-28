import React from "react";
import ReactDatePicker from "react-datepicker";

import styles from "../InputBox/input.module.scss";

export interface DatePickerProps {
  value: Date;
  hint?: string;
  error: string;
  label: string;
  handleInput: (date: Date | [Date, Date] | null) => void;
  className?: string;
}

export default function DatePicker({
  error,
  label,
  value,
  hint,
  handleInput,
  className,
}: DatePickerProps) {
  return (
    <div className={`${styles["input-container"]} ${className}`}>
      <label className={styles["input-label"]}>{label}</label>
      {hint ? <small className="mt-2 text-mute">{hint}</small> : null}
      <ReactDatePicker
        selected={value}
        className={
          error ? `${styles["input-box"]} ${styles["input-box-invalid"]}` : styles["input-box"]
        }
        onChange={handleInput}
        dateFormat="dd/MM/yyyy"
        peekNextMonth={true}
        showMonthDropdown={true}
        showYearDropdown={true}
        dropdownMode="select"
      />
      {error ? <small className="text-danger">{error}</small> : null}
    </div>
  );
}
