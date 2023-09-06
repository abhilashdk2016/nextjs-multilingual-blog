import { DUMMY_CATEGORIES, DUMMY_POSTS } from "@/DUMMY_DATA"
import PaddingContainer from "@/components/layout/padding-container";
import PostList from "@/components/post/post-list";


const Page = ({
    params
}: {
    params: {
        category: string
    }
}) => {
  const category = DUMMY_CATEGORIES.find(cat => cat.slug === params.category)
  const posts = DUMMY_POSTS.filter(post => post.category.title.toLowerCase() === params.category)
  return (
    <PaddingContainer>
        <div className="mb-10">
            <h1 className="text-4xl font-semibold">{category?.title}</h1>
            <p className="text-lg text-neutral-600">{category?.description}</p>
        </div>
        <PostList posts={posts} />
    </PaddingContainer>
  )
};

export const generateStaticParams = async () => {
    return DUMMY_CATEGORIES.map(category => {
        return {
            category: category.slug
        }
    });
}

export default Page