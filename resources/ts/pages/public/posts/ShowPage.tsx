import PostDetail from "@/ts/components/posts/PostDetail";
import PublicLayout, { RootProps } from "@/ts/layouts/PublicLayout";
import { Post } from "@/ts/types/post";

type Props = RootProps & {
  post: Post;
}

const PostDetailPage = ({ post, auth }: Props) => {
  return (
    <PublicLayout auth={auth}>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-3"></div>
        <div className="col-span-12 md:col-span-6">
          <PostDetail post={post} />
        </div>
      <div className="col-span-12 md:col-span-3"></div>
    </div>
    </PublicLayout >
  );
};

export default PostDetailPage;
