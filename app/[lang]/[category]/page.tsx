import { DUMMY_CATEGORIES, DUMMY_POSTS } from "@/DUMMY_DATA"
import PaddingContainer from "@/components/layout/padding-container";
import PostList from "@/components/post/post-list";
import client from "@/lib/directus";
import { Post } from "@/types/collection";
import { readItems } from "@directus/sdk";
import { notFound } from "next/navigation";

const Page = async ({
    params
}: {
    params: {
        category: string,
        lang:string
    }
}) => {
//   const category = DUMMY_CATEGORIES.find(cat => cat.slug === params.category)
//   const posts = DUMMY_POSTS.filter(post => post.category.title.toLowerCase() === params.category)
const locale = params.lang
  const getCategoryData = async () => {
    try {
        const category = await client.request(readItems("category", {
            filter: { slug: { _eq: params.category }},
            fields: ["*", "posts.*", "posts.author.first_name", "posts.author.last_name", "posts.author.id", "posts.category.id", "posts.category.title", "translations.*", "posts.translations.*"]
        }, ));
        if(locale === "en") {
            return category[0];
          } else {
            const localisedCategories = category.map(cat => {
              return {
                ...cat,
                title: cat.translations[0] ? cat.translations[0].title : cat.title,
                description: cat.translations[0] ? cat.translations[0].description : cat.description,
                posts: cat.posts.map((post:any) => {
                    return {
                        ...post,
                        title: post.translations[0] ? post.translations[0].title : post.title,
                        description: post.translations[0] ? post.translations[0].description : post.description,
                        body: post.translations[0] ? post.translations[0].body : post.body,
                    }
                })
              }
            })
            return localisedCategories[0];
          }
    } catch (error) {
        console.log(error);
    }
  }
  const category = await getCategoryData();
  if(!category) {
    return notFound();
  }

  const typeCorrectedCategory = category as unknown as {
    id: string;
    title: string;
    description: string;
    slug: string;
    posts: Post[];
  }
  return (
    <PaddingContainer>
        <div className="mb-10">
            <h1 className="text-4xl font-semibold">{typeCorrectedCategory?.title}</h1>
            <p className="text-lg text-neutral-600">{typeCorrectedCategory?.description}</p>
        </div>
        <PostList locale={locale} posts={typeCorrectedCategory?.posts} />
    </PaddingContainer>
  )
};

export const generateStaticParams = async () => {
    // return DUMMY_CATEGORIES.map(category => {
    //     return {
    //         category: category.slug
    //     }
    // });
    try {
        const categories = await client.request(readItems("category", {
            filter: { status: { _eq: "published" }},
            fields: ["slug"]
        }, ));
        const params = categories?.map(category => {
            return {
                category: category.slug as string,
                lang: "en"
            }
        });
        const localisedParams = categories?.map(category => {
            return {
                category: category.slug as string,
                lang: "de"
            }
        });
        const allParams = params?.concat(localisedParams ??[]);
        return allParams as any || [];
    } catch (error) {
        console.log(error);
    }
}

export default Page