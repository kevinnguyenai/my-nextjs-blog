import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark'
import html from 'remark-html'

const postDictionary = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
    // Get filename under the /posts
    const fileNames = fs.readdirSync(postDictionary);
    const allPostsData = fileNames.map(fileName => {
        // Remove ".md" from filename to get id
        const id = fileName.replace(/\.md$/, '');
        // Read markdown file as string
        const fullPath = path.join(postDictionary, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf-8');
        // Use gray-matter  to parse the post metadata section
        const matterResult = matter(fileContents);
        // Combine the data with the id
        return {
            id,
            ...matterResult.data
        };

    });
    return allPostsData.sort( ({date: a}, {date: b}) => {
        if(a < b) {
            return 1;
        } else 
        if( a > b) {
            return -1;
        } else {
            return 0;
        }
    });

}
// fetch data from remote api 
/*
export function getApiPostsData() {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  const res = await fetch('..')
  return res.json()
}
*/

// fetch data direct from db (using in serverside render context or before render )
/*
export function getDbPostsData() {
    import someDatabaseSDK from 'someDatabaseSDK'

    const databaseClient = someDatabaseSDK.createClient(...)
    
    export async function getSortedPostsData() {
      // Instead of the file system,
      // fetch post data from a database
      return databaseClient.query('SELECT posts...')
    }
}
*/

export function getAllPostsIds() {
    const fileNames = fs.readdirSync(postDictionary);

    // Returns an array that looks like this:
    // [
    //   {
    //     params: {
    //       id: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'pre-rendering'
    //     }
    //   }
    // ]
    return fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.md$/,'')
            }
        }
    });
}

export async function getPostsData(id) {
    const fullPath  = path.join(postDictionary, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf-8')

    // use gray-matter to parse the post metadata
    const matterResult = matter(fileContents)

    // use remark to convert markdown into HTML string
    const processContent = await remark()
    .use(html)
    .process(matterResult.content)
    const contentHtml = processContent.toString()
    // combine the data with the id
    return {
        id,
        contentHtml,
        ...matterResult.data
    }
}