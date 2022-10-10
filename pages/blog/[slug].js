import Link from "next/link";
import { useRouter } from "next/router";
import { getBlogPosts, getSingleBlogPost } from "../../lib/api";

export default function Post({ post }) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Cargando...</p>;
  }

  return (
    <main>
      <header>
        <nav>
          <Link href="/">Back to homepage</Link>
        </nav>
        <h1>{post.title}</h1>
        {post.summary ? <p>{post.summary}</p> : null}
      </header>

      <section>
        <div dangerouslySetInnerHTML={{ __html: post.body }} />
      </section>
    </main>
  );
}

export async function getStaticPaths() {
  const posts = await getBlogPosts();

  const paths = posts.map((post) => {
    return {
      params: {
        slug: post.slug,
      },
    };
  });

  // Tiene que devolver un objeto similar a este
  // [
  //   {
  //     params: { slug: "valor" },
  //   },
  //   {
  //     params: { slug: "valor" },
  //   },
  // ];

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  // context.params.slug (es el slug que viene de la url)

  const post = await getSingleBlogPost(context.params.slug);

  return {
    props: {
      post,
    },
    revalidate: 10,
  };
}
