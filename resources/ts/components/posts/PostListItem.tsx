import { Post } from "@/ts/types/post";
import { Tag } from "@/ts/types/tag";
import { Link } from "@inertiajs/react";
import { useRoute } from "ziggy-js";
import TagBadge from "../tags/TabBadge";

const PostListItem = ({ post }: { post: Post }) => {
  const routes = useRoute();

  return (
    <Link
      key={post.id}
      href={routes('posts.show', { slug: post.slug })}
      className="block bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-lg p-5 shadow-sm hover:shadow-md hover:bg-white/90 transition-all duration-200 overflow-hidden flex flex-col justify-between"
    >
      <h2 className="line-clamp-2 text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors duration-200">
        {post.title}
      </h2>

      {post.description && (
        <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-3">
          {post.description}
        </p>
      )}

      {post.public_tags != undefined && post.public_tags.length > 0 && (
        <div className="flex overflow-auto gap-2">
          {post.public_tags.map((item: Tag) => (
            <TagBadge
              key={item.id}
              tag={item}
              classes="text-xs bg-gray-100 text-gray-700 border-gray-200 text-gray-300"
              useLink={false}
            />
          ))}
        </div>
      )}
    </Link>
  );
};

export default PostListItem;
