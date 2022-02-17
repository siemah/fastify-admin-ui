import React from 'react';
import styles from './style.module.css';

type ButtonPropsTypes = {
  type?: "submit" | "button";
  children: React.ReactNode;
}
export default function Button({ type = 'button', children }: ButtonPropsTypes) {
  return (
    <button 
      type={type}
      className={styles.button}
      >
      {children}
    </button>
  )
}
