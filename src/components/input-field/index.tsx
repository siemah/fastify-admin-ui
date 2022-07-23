import React from 'react';
import styles from './style.module.css';

type InputFieldPropsTypes = {
  name: string;
  label: string;
  error?: string | undefined;
  type?: "text" | "email" | "password" | "textarea";
  className?: string | undefined;
  autoFocus?: boolean | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}
export default function InputField({ name, label, type = "text", error, autoFocus, className = '', onChange }: InputFieldPropsTypes) {
  return (
    <div className={styles.input__container}>
      <label className={styles.input__label} htmlFor={name}>
        {label}
      </label>
      {
        type === 'textarea'
          ? (
            <textarea
              name={name}
              onChange={onChange}
              className={`${styles.input}${className}`}
              id={name}
            />
          )
          : (
            <input
              name={name}
              type={type}
              onChange={onChange}
              className={`${styles.input}${className}`}
              autoFocus={autoFocus}
              id={name}
            />
          )
      }
      {
        error && (
          <div className={styles.input__error}>
            {error}
          </div>
        )
      }
    </div>
  );
}
