import { DUMMY_POSTS } from "@/DUMMY_DATA";
import CtaCard from "@/components/elements/cta-card";
import PaddingContainer from "@/components/layout/padding-container";
import PostCard from "@/components/post/post-card";
import PostList from "@/components/post/post-list";
import client from "@/lib/directus";
import { Post } from "@/types/collection";
import { readItems } from "@directus/sdk";
import { notFound } from "next/navigation";

export default async function Home({ params } : { params : { lang: string }}) {
  const locale = params.lang;
  const getAllPosts = async () => {
    try {
      const posts = await client.request(readItems("post", {
        fields: ["*", "author.id", "author.first_name", "author.last_name", "category.id", "category.title", "translations.*", "category.translations.*"]
      }));
      if(locale === "en") {
        return posts;
      } else {
        const localisedPosts = posts.map(post => {
          return {
            ...post,
            title: post.translations[0] ? post.translations[0].title : post.title,
            description: post.translations[0] ? post.translations[0].description : post.description,
            body: post.translations[0] ? post.translations[0].body : post.body,
            category: {
              ...post.category,
              title: post.category.translations[0] ? post.category.translations[0].title : post.category.title
            }
          }
        })
        return localisedPosts;
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching data")
    }
  }
  const posts = await getAllPosts();
  if(!posts) {
    notFound();
  }
  
  return (
    <PaddingContainer>
      <main className="h-auto space-y-10">
        <PostCard locale={locale} post={posts[0] as Post} />
        <PostList locale={locale} posts={posts.filter((_, index) => index > 0 && index < 3) as Post[]} />
        <CtaCard locale={locale} />
        <PostCard locale={locale} post={posts[3] as Post} reverse={true} />
        <PostList locale={locale} posts={posts.filter((_, index) => index > 3 && index < 6) as Post[]} />
      </main>
    </PaddingContainer>
  )
}
