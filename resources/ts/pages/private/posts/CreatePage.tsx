import PostForm from "@/ts/components/posts/PostForm";
import PrivateLayout, { RootProps } from "@/ts/layouts/PrivateLayout";
import { Post } from "@/ts/types/post";
import type { Series } from "@/ts/types/series";
import { router } from "@inertiajs/react";
import { format } from "date-fns";
import { useRoute } from "ziggy-js";

type Props = RootProps & {
  series: Series[];
}

const CreatePage = ({ auth, series }: Props) => {
  const route = useRoute();

  const handleCreate = (post: Post & { series_ids: number[] }) => {
    router.post(route('admin.posts.store'), {
      ...post,
      tags: post?.tags?.map((tag) => tag.name) ?? [],
      published_at: post?.published_at ? format(post.published_at, 'yyyy-MM-dd') : null,
      series_ids: post?.series_ids ?? [],
    }, {
      onSuccess: (data) => {
        console.log("data: ", data);
        router.visit(route('admin.index'));
      },
      onError: (errors) => {
        console.error('Create post failed:', errors);
      }
    });
  }

  return (
    <PrivateLayout auth={auth}>
      <h2 className="text-2xl font-bold text-gray-100 text-center">Bài viết mới</h2>
      <div className="flex flex-col gap-4 mt-4">
        <PostForm onSave={handleCreate} series={series} />
      </div>
    </PrivateLayout>
  );
};

export default CreatePage;
