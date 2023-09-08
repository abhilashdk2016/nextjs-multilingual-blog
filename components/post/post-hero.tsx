import { Post } from "@/types/collection"
import PostContent from "./post-content"
import Image from "next/image"

interface PostHeroProps {
    post: Post,
    locale: string,
    isPostPage?: boolean
}

const PostHero = ({ post, locale, isPostPage = false }: PostHeroProps) => {
  return (
    <div>
        <PostContent locale={locale} post={post} isPostPage />
        <Image className={`rounded-md object-cover object-center md:h=[500] mt-6 w-full ${isPostPage ? 'h-[500px]' : 'h-[300px]'}`} src={`${process.env.NEXT_PUBLIC_ASSET_URL}${post.image}?key=optimize`} alt={post.title} width={1280} height={500} />
    </div>
  )
}

export default PostHero