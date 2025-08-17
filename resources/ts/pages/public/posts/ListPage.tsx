import PaginationBar from "@/ts/components/common/PaginationBar";
import PostListItem from "@/ts/components/posts/PostListItem";
import TagBadge from "@/ts/components/tags/TabBadge";
import PublicLayout from "@/ts/layouts/PublicLayout";
import { AuthUser } from "@/ts/types/auth";
import { Pagination } from "@/ts/types/common";
import { Tag } from "@/ts/types/tag";
import { Post } from "@ts/types/post";

const ListPage = ({ posts, tags, auth }: { posts: Pagination<Post>, tags: Tag[], auth: AuthUser | null }) => {

  const { data } = posts;

  return (
    <PublicLayout auth={auth}>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-8 lg:col-span-9 2xl:col-span-10 flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.map((post: Post) => (
              <PostListItem key={post.id} post={post} />
            ))}

          </div>
          <div className="flex items-center justify-center my-3">
            <PaginationBar pagination={posts} />
          </div>
        </div>
        <div className="pl-4 border-l border-gray-200 col-span-12 md:col-span-4 lg:col-span-3 2xl:col-span-2">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag: Tag) => (
              <TagBadge key={tag.id} tag={tag} useLink={false} />
            ))}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default ListPage;
