import { getReadingTime, getRelativeDate } from "@/lib/helpers";
import { Post } from "@/types/collection";
import { ArrowRight } from "lucide-react";

interface PostContentProps {
    post: Post,
    isPostPage?: boolean
}

const PostContent = ({ post, isPostPage = false }: PostContentProps ) => {
  return (
    <div className="space-y-2">
        <div className={`flex items-center flex-wrap gap-2 text-neutral-400 ${isPostPage ? "text-sm" : "@md:text-sm text-xs"}`}>
            <div className={
                `font-medium ${post.category.title === 'Cities' ? 'text-emerald-600' : 'text-indigo-600'}`
            }>
                {post.category.title}
            </div>
            <div className="w-2 h-2 rounded-full bg-neutral-200" />
            <div>{`${post.author.first_name} ${post.author.last_name}`}</div>
            <div className="w-2 h-2 rounded-full bg-neutral-200" />
            <div>{getReadingTime(post.body)}</div>
            <div className="w-2 h-2 rounded-full bg-neutral-200" />
            <div>{getRelativeDate(post.date_created)}</div>
        </div>
        <h2 className={` ${isPostPage ? "text-2xl md:text-3xl lg:text-4xl font-bold" : "@lg:text-3xl text-xl @md:text-2xl font-medium" }   pt-3`}>{post.title}</h2>
        <p className="text-neutral-600 leading-snug text-base @lg:text-lg">{post.description}</p>
        {!isPostPage && <div className="flex items-center gap-2">Read More <ArrowRight size="14"/></div>}
    </div>
  )
}

export default PostContent