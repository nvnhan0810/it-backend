import PostForm from "@/ts/components/posts/PostForm";
import PrivateLayout, { RootProps } from "@/ts/layouts/PrivateLayout";
import { Post } from "@/ts/types/post";
import type { Series } from "@/ts/types/series";
import { router } from "@inertiajs/react";
import { format } from "date-fns";
import { useRoute } from "ziggy-js";

type Props = RootProps & {
  post: Post;
  series: Series[];
  selectedSeriesIds?: number[];
}

const EditPage = ({ auth, post, series, selectedSeriesIds = [] }: Props) => {
  const route = useRoute();

  const handleUpdate = (editedPost: Post & { series_ids: number[] }) => {
    console.log("editedPost: ", editedPost);
    router.patch(route('admin.posts.update', { id: post.id }), {
      ...editedPost,
      published_at: editedPost.published_at ? format(editedPost.published_at, 'yyyy-MM-dd') : null,
      tags: editedPost?.tags?.map((tag) => tag.name) ?? [],
      series_ids: editedPost?.series_ids ?? [],
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
        <PostForm onSave={handleUpdate} initialPost={post} series={series} selectedSeriesIds={selectedSeriesIds} />
      </div>
    </PrivateLayout>
  );
};

export default EditPage;
