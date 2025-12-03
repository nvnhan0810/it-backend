import PostDetail from "@/ts/components/posts/PostDetail";
import PublicLayout, { RootProps } from "@/ts/layouts/PublicLayout";
import { Post } from "@/ts/types/post";
import type { Series } from "@/ts/types/series";
import { cn } from "@/ts/utils";
import { Link } from "@inertiajs/react";
import { useRoute } from "ziggy-js";

type Props = RootProps & {
  post: Post;
  series: Series[];
};

const PostDetailPage = ({ post, auth, series = [] }: Props) => {
  const route = useRoute();

  return (
    <PublicLayout auth={auth}>
      <div className="max-w-4xl mx-auto">
        <div className="bg-card border border-border rounded-xl p-6 md:p-10 shadow-sm">
          <PostDetail post={post} useTagLink={true} />
        </div>
        <div className="col-span-12 md:col-span-3">
          <div className="md:sticky md:top-0">
            <h2 className="text-lg font-bold text-gray-100 mb-4 border-b py-2.5">
              Series
            </h2>
            <div className="flex flex-col gap-2">
              {series.map((item) => (
                <div key={item.id}>
                  <div className="bg-secondary rounded-t-xl p-2">
                    {item.name}
                  </div>
                  <ul className="rounded-b-xl border">
                    {item.posts.map((postItem, index) => (
                      <li
                        key={postItem.id}
                        className={cn("py-2 px-4", {
                          "border-b": index !== item.posts.length - 1,
                          "hover:bg-gray-800/80": postItem.id !== post.id,
                          "bg-gray-800/50": postItem.id === post.id,
                        })}
                      >
                        {postItem.id !== post.id ? (
                          <Link
                          href={route("posts.show", { slug: post.slug })}
                          className="block"
                        >
                          {postItem.title}
                        </Link>
                        ) : (
                          <span className="block">{postItem.title}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default PostDetailPage;
