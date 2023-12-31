import { Post } from "@/types/collection"
import PostCard from "./post-card";

interface PostsListProps {
    posts: Post[];
    layout? : "horizontal" | "vertical",
    locale: string
}

const PostList = ({ posts, locale, layout = 'vertical' }: PostsListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:grid-flow-col lg:auto-cols-fr"> {
        posts.map(post => <PostCard locale={locale} post={post} key={post.id} layout={layout} />)
    }</div>
  )
}

export default PostList