import cn from "classnames";
import React from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  onClick: () => void;
  text?: string;
  size?: string;
  icon?: React.ReactNode;
  color?: string;
  disabled?: boolean;
}
const Button = ({
  onClick,
  text,
  size,
  icon,
  color,
  disabled,
}: ButtonProps) => {
  const handleClick = () => {
    !disabled && onClick();
  };
  return (
    <div
      className={cn(styles.button, size, {
        [styles.disabled]: disabled,
      })}
      onClick={handleClick}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {text && <span>{text}</span>}
    </div>
  );
};

export default Button;
