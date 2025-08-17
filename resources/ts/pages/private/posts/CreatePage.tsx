import PostForm from "@/ts/components/posts/PostForm";
import PrivateLayout, { RootProps } from "@/ts/layouts/PrivateLayout";
import { Post } from "@/ts/types/post";
import { router } from "@inertiajs/react";
import { useRoute } from "ziggy-js";

type Props = RootProps

const CreatePage = ({ auth }: Props) => {
  const route = useRoute();

  const handleCreate = (post: Post) => {
    router.post(route('admin.posts.store'), {
      ...post,
    }, {
      onSuccess: () => {
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
        <PostForm onSave={handleCreate} />
      </div>
    </PrivateLayout>
  );
};

export default CreatePage;
