import React from "react";

import styles from "./modal.module.scss";

export interface ModalProp {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ title, onClose, children }: ModalProp) {
  return (
    <div className={styles["modal-mask"]}>
      <div className={styles["modal-wrapper"]}>
        <div className={styles["modal-container"]}>
          <div
            className={`${styles["modal-header"]} flex justify-content-space-between align-items-center`}
          >
            <h3>{title}</h3>
            <button className="btn-reset text-mute" onClick={onClose}>
              <i className="material-icons">close</i>
            </button>
          </div>

          <div className={styles["modal-body"]}>{children}</div>
        </div>
      </div>
    </div>
  );
}
