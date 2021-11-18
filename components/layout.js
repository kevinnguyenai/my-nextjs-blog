import styles from './layout.module.css';
import Head from 'next/head';
import Link from 'next/link';
import utilStyles from '../styles/utils.module.css';
import Image from 'next/image';

const name = 'Kevin Nguyen'
export const siteTitle = 'Next.js starter'

export default function Layout({children, home}) {
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta name="robots" content="index,nofollow" />
                <meta
                    name="description"
                    content="Learn how to build a personal blog using Next.js"
                />
                <meta
                    property="og:image"
                    content={`https://og-image.vercel.app/${encodeURI(
                        siteTitle
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>

            <header className={styles.container}>
                {home? (
                    <>
                        <Image
                            priority
                            src="/images/profile.png"
                            className={utilStyles.borderCircle}
                            height={144}
                            width={144}
                            alt={name}
                        />
                        <h1 className={utilStyles.heading2XL}>{name}</h1>

                    </>
                ): (
                    <>
                        <Link href="/">
                            <a>
                                <Image
                                    priority
                                    src="/images/profile.png"
                                    className={utilStyles.borderCircle}
                                    height={128}
                                    width={128}
                                    alt={name}
                                ></Image>
                            </a>
                        </Link>
                        <h2 className={utilStyles.headingLg}>
                            <Link href="/">
                                <a className={utilStyles.colorInherit}>{name}</a>
                            </Link>
                        </h2>
                    </>
                )

                }
            </header>
            <main>{children}</main>
            {!home && (
                <div className={styles.backHome}>
                    <Link href="/">
                        <a>Back to home</a>
                    </Link>
                </div>
            )}
        </div>
    )
};
