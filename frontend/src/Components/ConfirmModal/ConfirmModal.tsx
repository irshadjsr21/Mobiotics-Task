import React from "react";

import Button from "../Button/Button";
import Modal from "../Modal/Modal";

import styles from "./confirm-box.module.scss";

export interface ConfirmModalProps {
  title: string;
  confirmText?: string;
  children: React.ReactNode;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmModal({
  title,
  onClose,
  onConfirm,
  children,
  confirmText = "Confirm",
}: ConfirmModalProps) {
  return (
    <Modal title={title} onClose={onClose}>
      <div className={styles["confirm-modal-container"]}>{children}</div>
      <div className="mt-8 flex justify-content-center">
        <Button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          theme="danger"
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
}
