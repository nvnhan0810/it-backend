import { Button } from "@/ts/components/ui/button";
import Combobox from "@/ts/components/ui/combobox";
import { Input } from "@/ts/components/ui/input";
import { Label } from "@/ts/components/ui/label";
import { Textarea } from "@/ts/components/ui/textarea";
import PrivateLayout, { RootProps } from "@/ts/layouts/PrivateLayout";
import { Post } from "@/ts/types/post";
import { router } from "@inertiajs/react";
import { ArrowUpIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { useRoute } from "ziggy-js";
import {
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  DndContext,
  DragEndEvent,
  Active,
  Over,
  closestCenter,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SeriesPost } from "@/ts/types/series";
import PostItemForm from "@/ts/components/series/PostItemForm";
import PostListForm from "@/ts/components/series/PostListForm";

type Props = RootProps & {
  posts: Post[];
};

const CreatePage = ({ auth, posts }: Props) => {
  const route = useRoute();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [seriesPosts, setSeriesPosts] = useState<number[]>([]);

  const handleChangeSerialPosts = (result: number[]) => {
    setSeriesPosts([...result]);
  };

  const handleCreate = () => {
    router.post(
      route("admin.series.store"),
      {
        name: title,
        description: description,
        posts: seriesPosts.map((postId, index) => ({
          order: index + 1,
          post_id: postId,
        })),
      },
      {
        onSuccess: () => {
          router.visit(route("admin.series.index"));
        },
        onError: (errors) => {
          console.error("Create series failed:", errors);
        },
      }
    );
  };



  return (
    <PrivateLayout auth={auth}>
      <h2 className="text-2xl font-bold text-gray-100 text-center">
        Series mới
      </h2>
      <div className="flex flex-col gap-4 mt-4">
        <div className="mb-2">
          <Input
            name="name"
            placeholder="Tên series"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <Textarea
            name="description"
            placeholder="Mô tả series"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <PostListForm posts={posts} initSerialPosts={[]} onChangeSerialPosts={handleChangeSerialPosts} />
      </div>
      <div className="flex justify-center mt-4">
        <Button onClick={handleCreate}>Tạo series</Button>
      </div>
    </PrivateLayout>
  );
};

export default CreatePage;
