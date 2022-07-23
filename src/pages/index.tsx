import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import A from '../components/a'
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Post API App</title>
        <meta name="description" content="post api ui admin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <A href='/dashboard'>Post API</A>
        </h1>

        <p className={styles.description}>
          Welcome to{' '}
          <code className={styles.code}>Post API</code> admin app
        </p>

        <iframe
          src="https://www.youtube.com/embed/4-TbQnONe_w?list=RD4-TbQnONe_w"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          className='aspect-video max-w-3xl w-full hover:aspect-auto md:aspect-auto focus:aspect-4/3'
        />

      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
