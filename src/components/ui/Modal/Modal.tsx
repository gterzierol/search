import React, { ReactNode, useRef } from "react";
import styles from "./Modal.module.scss";
import { useOnClickOutside } from "@/hooks/use-click-outside";
interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  setModalOpen: (isOpen: boolean) => void;
}
const Modal = ({ children, isOpen, setModalOpen }: ModalProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const handleClose = () => {
    setModalOpen(false);
  };

  useOnClickOutside(ref, handleClose);

  return isOpen ? (
    <div ref={ref} className={styles.modal}>
      {children}
    </div>
  ) : null;
};

export default Modal;
