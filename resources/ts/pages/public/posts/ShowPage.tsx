import PostContent from "@/ts/components/posts/PostContent";
import TagBadge from "@/ts/components/tags/TabBadge";
import RootLayout, { RootProps } from "@/ts/layouts/RootLayout";
import { Post } from "@/ts/types/post";
import { Tag } from "@/ts/types/tag";

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

          {post.public_tags != undefined && post.public_tags?.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.public_tags.map((item: Tag) => (
                <TagBadge key={item.id} tag={item} useLink={false} />
              ))}
            </div>
          ) : <></>}

          {post.description && (
            <p className='py-4 mb-6 text-gray-300 text-sm italic'>{post.description}</p>
          )}
          <div className="mt-4">
            <PostContent doc={post.content} />
          </div>
        </div>
      <div className="col-span-12 md:col-span-3"></div>
    </div>
    </RootLayout >
  );
};

export default PostDetailPage;
