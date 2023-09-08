import { DUMMY_POSTS } from '@/DUMMY_DATA';
import CtaCard from '@/components/elements/cta-card';
import SocialLink from '@/components/elements/social-link';
import PaddingContainer from '@/components/layout/padding-container';
import PostBody from '@/components/post/post-body';
import PostHero from '@/components/post/post-hero';
import client from '@/lib/directus';
import { Post } from '@/types/collection';
import { readItems } from '@directus/sdk';
import { notFound } from 'next/navigation';
import React from 'react'

const Page = async ({
    params
}: {
    params: {
        slug: string,
        lang: string
    }
}) => {
    // const post = DUMMY_POSTS.find(post => post.slug === params.slug);
    const locale = params.lang
    const getPostData = async () => {
        try {
          const posts = await client.request(readItems("post", {
            filter: { slug: params.slug },
            fields: ["*", "author.id", "author.first_name", "author.last_name", "category.id", "category.title", "translations.*", "category.translations.*"]
          }));
          if(locale === "en") {
            return posts[0] as Post;
          } else {
            const localisedCategories = posts.map(post => {
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
            return localisedCategories[0] as Post;
          }
        } catch (error) {
          console.log(error);
          throw new Error("Error fetching data")
        }
      }
    const post = await getPostData();
    if(!post) {
        notFound();
    }
  return (
    <PaddingContainer>
        <div className='space-y-10'>
            <PostHero isPostPage locale={params.lang} post={post} />
            <div className='mt-10 flex flex-col md:flex-row gap-10'>
                <div className='relative'>
                    <div className='sticky top-20 flex md:flex-col gap-5 items-center'>
                        <div className='font-medium md:hidden'>Share this content:</div>
                        <SocialLink
                            isShareURL
                            platform='facebook'
                            link={`https://www.facebook.com/sharer/sharer.php?u=${`${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`}`} />
                        
                        <SocialLink
                            isShareURL
                            platform='twitter'
                            link={`https://twitter.com/intent/tweet?url=${`${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`}`} />
                        
                        <SocialLink
                            isShareURL
                            platform='linkedin'
                            link={`https://www.linkedin.com/shareArticle?mini=true&url=${`${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`}`} />
                    </div>
                </div>
                <div className='h-[400px] md:h-[500px] w-full overflow-auto'>
                    <PostBody body={post.body} />
                </div>
            </div>
            <CtaCard locale={params.lang}/>
        </div>
    </PaddingContainer>
  )
}

export const generateStaticParams = async () => {
    // return DUMMY_POSTS.map(post => {
    //     return {
    //         slug: post.slug
    //     }
    // });
    try {
        const posts = await client.request(readItems("post", {
            filter: { status: { _eq: "published" }},
            fields: ["slug"]
        }, ));
        const params = posts?.map(post => {
            return {
                slug: post.slug as string,
                lang: "en"
            }
        });
        const localisedparams = posts?.map(post => {
            return {
                slug: post.slug as string,
                lang: "de"
            }
        });
        const allParams = params?.concat(localisedparams ?? []);
        return allParams as any || [];
    } catch (error) {
        console.log(error);
    }
}

export default Page