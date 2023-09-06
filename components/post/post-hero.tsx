import { Post } from "@/types/collection"
import PostContent from "./post-content"
import Image from "next/image"

interface PostHeroProps {
    post: Post
}

const PostHero = ({ post }: PostHeroProps) => {
  return (
    <div>
        <PostContent post={post} isPostPage />
        <Image className="rounded-md object-cover object-center h-[300px] md:h=[500] mt-6" src={post.image} alt={post.title} width={1280} height={500} />
    </div>
  )
}

export default PostHero