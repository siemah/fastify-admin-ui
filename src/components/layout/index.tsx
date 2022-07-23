import Head from 'next/head';
import React from 'react';
import styles from './style.module.css';

type LayoutPropsTypes = {
  children: React.ReactNode;
  title: string;
  description?: string | undefined;
}
// todo: add all seo tags here or export it to an external component
export default function Layout({ title, description, children }: LayoutPropsTypes) {
  return (
    <main className={styles.main__block}>
      <Head>
        <title>{`${title} - ${process.env.NEXT_PUBLIC_TITLE}`}</title>
        <meta name='description' content={description || title} />
      </Head>
      <div className='container mx-auto px-4'>
      {children}
      </div>
    </main>
  );
}