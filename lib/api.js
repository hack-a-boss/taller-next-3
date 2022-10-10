import Butter from "buttercms";

const butter = Butter(process.env.NEXT_PUBLIC_BUTTER_API);

export async function getFrontPageData() {
  const page = await butter.page.retrieve("*", "frontpage");

  return page.data.data;
}

export async function getBlogPosts() {
  const posts = await butter.post.list({
    exclude_body: true,
  });

  return posts.data.data;
}

export async function getSingleBlogPost(slug) {
  const post = await butter.post.retrieve(slug);

  return post.data.data;
}
