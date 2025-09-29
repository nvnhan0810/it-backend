import { Input } from "@/ts/components/ui/input";
import PrivateLayout, { RootProps } from "@/ts/layouts/PrivateLayout";
import { Post } from "@/ts/types/post";
import { router } from "@inertiajs/react";
import { format } from "date-fns";
import { useRoute } from "ziggy-js";

type Props = RootProps

const CreatePage = ({ auth }: Props) => {
  const route = useRoute();

  const handleCreate = (post: Post) => {
    router.post(route('admin.posts.store'), {
      ...post,
      tags: post?.tags?.map((tag) => tag.name) ?? [],
      published_at: post.published_at ? format(post.published_at, 'yyyy-MM-dd') : null,
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
      <h2 className="text-2xl font-bold text-gray-100 text-center">Series mới</h2>
      <div className="flex flex-col gap-4 mt-4">
        <Input name="name" placeholder="Tên series" />
      </div>
    </PrivateLayout>
  );
};

export default CreatePage;
