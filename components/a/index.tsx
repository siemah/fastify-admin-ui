import Link from 'next/link';
import React from 'react';
import styles from './style.module.css';

type APropsTypes = {
  href: string;
  title?: string | undefined;
  className?: string | undefined;
  children: React.ReactNode;
};
export default function A({ href, title, className, children }: APropsTypes) {
  return (
    <Link href={href}>
      <a
        title={title}
        className={`${styles.link} ${className || ''}`}
      >
        {children}
      </a>
    </Link>
  )
}
