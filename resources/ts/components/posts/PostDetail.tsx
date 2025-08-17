import { Post } from "@/ts/types/post";
import { Tag } from "@/ts/types/tag";
import TagBadge from "../tags/TagBadge";
import PostContent from "./PostContent";

type Props = {
  post: Post;
  useTagLink?: boolean;
}

const PostDetail = ({ post, useTagLink = false }: Props) => {
  return (
    <>
      <h1 className="text-2xl font-bold text-gray-100 mb-4">{post.title}</h1>
      <hr />

      {post.public_tags != undefined && post.public_tags?.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.public_tags.map((item: Tag) => (
            <TagBadge key={item.id} tag={item} useLink={useTagLink} />
          ))}
        </div>
      ) : <></>}

      {post.description && (
        <p className='py-4 mb-6 text-gray-300 text-sm italic'>{post.description}</p>
      )}
      <div className="mt-4">
        <PostContent doc={post.content} />
      </div>
    </>
  );
};

export default PostDetail;
