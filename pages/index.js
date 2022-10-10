import Image from "next/image";
import Link from "next/link";
import { getBlogPosts, getFrontPageData } from "../lib/api";

export default function Home({ page, posts }) {
  return (
    <main>
      <header>
        <h1>{page.title}</h1>
        <p>{page.intro}</p>
        <figure>
          <Image
            src={page.header_photo}
            alt={page.title}
            layout="fill"
            objectFit="cover"
            width={1200}
            height={713}
          />
        </figure>
      </header>

      <section class="frontpage-content">
        <ul class="frontpage-posts">
          {posts.map((post) => {
            return (
              <li key={post.slug}>
                <h3>
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                {post.featured_image ? (
                  <figure>
                    <Image
                      src={post.featured_image}
                      layout="fill"
                      objectFit="cover"
                      alt={post.title}
                    />
                  </figure>
                ) : null}
                <p>{post.summary}</p>
                <time>{new Date(post.published).toLocaleDateString()}</time>
              </li>
            );
          })}
        </ul>

        <aside>
          <h2>Sobre mi</h2>
          <div dangerouslySetInnerHTML={{ __html: page.about_me }} />
        </aside>
      </section>
    </main>
  );
}

export async function getStaticProps() {
  const page = await getFrontPageData();
  const posts = await getBlogPosts();

  return {
    props: {
      page: {
        ...page.fields,
      },
      posts,
    },
    revalidate: 10,
  };
}
