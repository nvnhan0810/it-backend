import PaginationBar from "@/ts/components/common/PaginationBar";
import PostListItem from "@/ts/components/posts/PostListItem";
import SearchForm from "@/ts/components/posts/SearchForm";
import TagBadge from "@/ts/components/tags/TagBadge";
import PublicLayout from "@/ts/layouts/PublicLayout";
import { AuthUser } from "@/ts/types/auth";
import { Pagination } from "@/ts/types/common";
import { Tag } from "@/ts/types/tag";
import { router } from "@inertiajs/react";
import { Post } from "@ts/types/post";
import { useRoute } from "ziggy-js";

const ListPage = ({ posts, tags, auth }: { posts: Pagination<Post>, tags: Tag[], auth: AuthUser | null }) => {

  const route = useRoute();
  const { data } = posts;

  const handleSearch = (search: string) => {
    router.get(route('home'), { search: search }, {
      preserveUrl: true,
      preserveScroll: true,
      replace: true,
    });
  };

  const queryParams = new URLSearchParams(window.location.search);
  const currentTag = queryParams.get('tag');

  return (
    <PublicLayout auth={auth}>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {currentTag ? `Posts tagged "${currentTag}"` : 'Latest Posts'}
            </h1>
            <div className="w-full sm:w-auto">
              <SearchForm onSearch={handleSearch} />
            </div>
          </div>

          {data.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {data.map((post: Post) => (
                  <PostListItem key={post.id} post={post} />
                ))}
              </div>
              <div className="mt-8 flex justify-center">
                <PaginationBar pagination={posts} />
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No posts found.</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="lg:w-80 flex-shrink-0">
          <div className="sticky top-24 space-y-8">
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-lg mb-4 text-foreground">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag: Tag) => (
                  <TagBadge 
                    key={tag.id} 
                    tag={tag} 
                    useLink={true} 
                    classes={currentTag === tag.slug ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}
                  />
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </PublicLayout>
  );
};

export default ListPage;
