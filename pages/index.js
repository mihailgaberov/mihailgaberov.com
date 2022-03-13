import Link from "next/link";

import { Layout } from "../components/Layout";
import { getDatabase } from "../lib/notion";
import styles from "./index.module.scss";
import { Text } from "./[id].js";


export const databaseId = process.env.NOTION_DATABASE_ID;


export default function Home({ posts }) {
  const sortedPost = () => {
    return posts.sort((a, b) => {
      return (
          new Date(b.properties.date.date.start) -
          new Date(a.properties.date.date.start)
      );
    });
  };

  return (
      <Layout>
        <ol className={styles.posts}>
          {sortedPost().map((post) => {
            const date = new Date(post.properties.date.date.start).toLocaleString(
                "en-US",
                {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                }
            );

            return (
                <li key={post.id} className={styles.post}>
                  <h3 className={styles.postTitle}>
                    <Link href={`/${post.id}`}>
                      <a>
                        <Text text={post.properties.Name.title} postId={post.id}/>
                      </a>
                    </Link>
                  </h3>

                  <p className={styles.postDescription}>{date}</p>
                  <Link href={`/${post.id}`}>
                    <a> Read post →</a>
                  </Link>
                </li>
            );
          })}
        </ol>
      </Layout>
  );
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);

  return {
    props: {
      posts: database,
    },
    revalidate: 1,
  };
};
