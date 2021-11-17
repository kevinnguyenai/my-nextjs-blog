import Layout from '../../components/layout'
import { getAllPostsIds, getPostsData } from '../../lib/posts'
import Date from '../../components/date'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'

export default function Post({postData}) {
  return ( 
    <Layout>
        <Head>
            <title>{postData.title}</title>
        </Head>
        <article>
            <h1 className={utilStyles.headdingXl}>{postData.title}</h1>
            <div className={utilStyles.lightText}>
                <Date dateString={postData.date}/>
            </div>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>    

    </Layout>
  )
}

export async function getStaticPaths() {
    // Return a list of possible value for id
    const paths = getAllPostsIds();

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    // Fetch necessary data for the blog post using params.id
    const postData = await getPostsData(params.id)
    return {
        props: {
            postData
        }
    }
}