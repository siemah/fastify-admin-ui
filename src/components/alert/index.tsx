import React from 'react';
import styles from './style.module.css';

type AlertPropsTypes = {
  type: "success" | "error";
  message: string | null | undefined;
};
export default function Alert({ type = 'success', message, }: AlertPropsTypes) {
  const typeStyle = styles[`alert_${type}`];

  if (!!message) {
    return (
      <div className={`${styles.alert} ${typeStyle}`}>
        {message}
      </div>
    );
  }
  return null;
}
