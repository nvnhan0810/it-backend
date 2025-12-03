import PostDetail from "@/ts/components/posts/PostDetail";
import PublicLayout, { RootProps } from "@/ts/layouts/PublicLayout";
import { Post } from "@/ts/types/post";

type Props = RootProps & {
  post: Post;
}

const PostDetailPage = ({ post, auth }: Props) => {
  return (
    <PublicLayout auth={auth}>
      <div className="max-w-4xl mx-auto">
        <div className="bg-card border border-border rounded-xl p-6 md:p-10 shadow-sm">
          <PostDetail post={post} useTagLink={true} />
        </div>
      </div>
    </PublicLayout>
  );
};

export default PostDetailPage;
