import { Post } from "@/ts/types/post";
import { Tag } from "@/ts/types/tag";
import { Link } from "@inertiajs/react";
import { useRoute } from "ziggy-js";
import TagBadge from "../tags/TagBadge";

const PostListItem = ({ post }: { post: Post }) => {
  const routes = useRoute();

  return (
    <Link
      key={post.id}
      href={routes('posts.show', { slug: post.slug })}
      className="group flex flex-col h-full bg-card hover:bg-accent/50 border border-border rounded-xl p-5 transition-all duration-300 hover:shadow-lg"
    >
      <div className="flex-grow">
        <h2 className="line-clamp-2 text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
          {post.title}
        </h2>

        {post.description && (
          <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
            {post.description}
          </p>
        )}
      </div>

      {post.public_tags != undefined && post.public_tags.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-2">
          {post.public_tags.map((item: Tag) => (
            <TagBadge
              key={item.id}
              tag={item}
              classes="text-xs py-1 px-2"
              useLink={false}
            />
          ))}
        </div>
      )}
    </Link>
  );
};

export default PostListItem;
