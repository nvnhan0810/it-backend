import PostForm from "@/ts/components/posts/PostForm";
import PrivateLayout, { RootProps } from "@/ts/layouts/PrivateLayout";
import { Post } from "@/ts/types/post";
import { router } from "@inertiajs/react";
import { format } from "date-fns";
import { useRoute } from "ziggy-js";

type Props = RootProps & {
  post: Post;
}

const EditPage = ({ auth, post }: Props) => {
  const route = useRoute();

  const handleUpdate = (editedPost: Post) => {
    console.log("editedPost: ", editedPost);
    router.patch(route('admin.posts.update', { id: post.id }), {
      ...editedPost,
      published_at: editedPost.published_at ? format(editedPost.published_at, 'yyyy-MM-dd') : null,
      tags: editedPost?.tags?.map((tag) => tag.name) ?? [],
    }, {
      onSuccess: () => {
        router.visit(route('admin.index'));
      },
      onError: (errors) => {
        console.error('Update post failed:', errors);
      }
    });
  }

  return (
    <PrivateLayout auth={auth}>
      <h2 className="text-2xl font-bold text-gray-100 text-center">Chỉnh sửa bài viết</h2>
      <div className="flex flex-col gap-4 mt-4">
        <PostForm onSave={handleUpdate} initialPost={post} />
      </div>
    </PrivateLayout>
  );
};

export default EditPage;
