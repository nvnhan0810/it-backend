import PostContent from "@/ts/components/posts/PostContent";
import TagBadge from "@/ts/components/tags/TabBadge";
import RootLayout, { RootProps } from "@/ts/layouts/RootLayout";
import { Post } from "@/ts/types/post";

type Props = RootProps & {
  post: Post;
}

const PostDetailPage = ({ post, auth }: Props) => {
  return (
    <RootLayout auth={auth}>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-3"></div>
        <div className="col-span-12 md:col-span-6">
          <h1 className="text-2xl font-bold text-gray-100 mb-4">{post.title}</h1>
          <hr />

          {post.tags != undefined && post.tags?.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((item) => (
                <TagBadge key={item.id} tag={item} />
              ))}
            </div>
          ) : <></>}

          {post.description && (
            <p className='pb-4 mb-6 text-foreground/70 text-sm italic'>{post.description}</p>
          )}
          <div className="mt-4 text-gray-300">
            <PostContent doc={post.content} />
          </div>
        </div>
      <div className="col-span-12 md:col-span-3"></div>
    </div>
    </RootLayout >
  );
};

export default PostDetailPage;
