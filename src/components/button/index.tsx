import React from 'react';
import styles from './style.module.css';

type ButtonPropsTypes = {
  type?: "submit" | "button";
  children: React.ReactNode;
  disabled?: boolean | undefined;
}
export default function Button({ type = 'button', disabled, children }: ButtonPropsTypes) {
  return (
    <button
      type={type}
      className={styles.button}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
