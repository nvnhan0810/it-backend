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
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className={cn("col-span-1", {
            "lg:col-span-8": series.length > 0,
            "lg:col-span-8 lg:col-start-3": series.length === 0
          })}>
            <div className="bg-card border border-border rounded-xl p-6 md:p-10 shadow-sm">
              <PostDetail post={post} useTagLink={true} />
            </div>
          </div>

          {/* Series Sidebar */}
          {series.length > 0 && (
            <div className="col-span-1 lg:col-span-4 space-y-6">
              <div className="sticky top-24">
                <h2 className="text-xl font-bold text-foreground mb-4 pb-2 border-b border-border">
                  Thuộc series
                </h2>
                <div className="flex flex-col gap-6">
                  {series.map((item) => (
                    <div key={item.id} className="border border-border rounded-xl overflow-hidden shadow-sm bg-card">
                      <div className="bg-muted px-4 py-3 font-semibold text-foreground border-b border-border">
                        {item.name}
                      </div>
                      <ul className="divide-y divide-border">
                        {item.posts.map((postItem) => (
                          <li
                            key={postItem.id}
                            className={cn("relative transition-colors", {
                              "bg-primary/10": postItem.id === post.id,
                              "hover:bg-muted/50": postItem.id !== post.id,
                            })}
                          >
                            {postItem.id !== post.id ? (
                              <Link
                                href={route("posts.show", { slug: postItem.slug })}
                                className="block px-4 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                              >
                                {postItem.title}
                              </Link>
                            ) : (
                              <div className="px-4 py-3 text-sm font-medium text-primary flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                {postItem.title}
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PublicLayout>
  );
};

export default PostDetailPage;
