import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home(): React.ReactElement {
  return (
    <div className={styles.container}>
      <Head>
        <title>vsk.me | Savas Vedova</title>
        <meta
          name="description"
          content="Welcome to my personal blog. I may share my stories here."
        />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <p className={styles.profile}>
          <img src="/avatar.png" alt="Savas Vedova profile picture" />
        </p>

        <h1 className={styles.title}>Hi there 👋</h1>

        <div className={styles.grid}>
          <a
            href="https://gitlab.com/svedova"
            target="_blank"
            rel="noreferrer noopener"
            className={styles.card}
          >
            <h2>During the day &rarr;</h2>
            <p>I work at GitLab</p>
          </a>

          <a
            href="https://www.stormkit.io"
            target="_blank"
            rel="noreferrer noopener"
            className={styles.card}
          >
            <h2>During my spare time &rarr;</h2>
            <p>I develop Stormkit</p>
          </a>

          <a
            href="https://twitter.com/savasvedova"
            target="_blank"
            rel="noreferrer noopener"
            className={styles.card}
          >
            <h2>You can reach out to me &rarr;</h2>
            <p>On Twitter</p>
          </a>

          <a
            href="https://www.linkedin.com/in/savas-vedova/"
            target="_blank"
            rel="noreferrer noopener"
            className={styles.card}
          >
            <h2>Or add me &rarr;</h2>
            <p>on LinkedIn</p>
          </a>
        </div>
      </main>
    </div>
  );
}
