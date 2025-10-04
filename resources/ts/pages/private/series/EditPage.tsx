import { Button } from "@/ts/components/ui/button";
import Combobox from "@/ts/components/ui/combobox";
import { Input } from "@/ts/components/ui/input";
import { Label } from "@/ts/components/ui/label";
import { Textarea } from "@/ts/components/ui/textarea";
import PrivateLayout, { RootProps } from "@/ts/layouts/PrivateLayout";
import { Post } from "@/ts/types/post";
import { Series } from "@/ts/types/series";
import { router } from "@inertiajs/react";
import { PlusIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { useRoute } from "ziggy-js";

type Props = RootProps & {
  series: Series;
  posts: Post[];
}

type SeriesPost = {
  order: number;
  post_id: number;
}

const EditPage = ({ auth, series, posts }: Props) => {
  const route = useRoute();

  const [title, setTitle] = useState(series.name);
  const [description, setDescription] = useState(series.description);
  const [seriesPosts, setSeriesPosts] = useState<SeriesPost[]>(series.posts.map((post) => ({
    order: post.pivot.order,
    post_id: post.id,
  })));

  const handleAddNewPostRow = () => {
    const newPostRow: SeriesPost = {
      order: seriesPosts.length + 1,
      post_id: 0,
    }

    setSeriesPosts([...seriesPosts, newPostRow]);
  }

  const handleChangeOrder = (order: string, index: number) => {
    // Nếu input rỗng, giữ nguyên giá trị hiện tại
    if (order === '') {
      setSeriesPosts(seriesPosts.map((post, i) => i === index ? { ...post, order: -1 } : post));
      return;
    }

    // Kiểm tra xem có phải là số hợp lệ không
    const parsedOrder = parseInt(order);
    if (isNaN(parsedOrder) || parsedOrder < 1) {
      // Nếu không phải số hoặc số < 1, giữ nguyên giá trị hiện tại
      return;
    }

    // Nếu là số hợp lệ, cập nhật
    setSeriesPosts(seriesPosts.map((post, i) => i === index ? { ...post, order: parsedOrder } : post));
  }

  const handleChangePost = (id: string, index: number) => {
    setSeriesPosts(seriesPosts.map((post, i) => i === index ? { ...post, post_id: parseInt(id) } : post));
  }

  const handleDeletePost = (index: number) => {
    setSeriesPosts(seriesPosts.filter((_, i) => i !== index));
  }

  const handleUpdate = () => {
    router.patch(route('admin.series.update', { id: series.id }), {
      name: title,
      description: description,
      'posts': seriesPosts.map((seriesPost) => ({
        order: seriesPost.order,
        post_id: seriesPost.post_id,
      })),
    }, {
      onSuccess: () => {
        router.visit(route('admin.series.index'));
      },
      onError: (errors) => {
        console.error('Update series failed:', errors);
      }
    });
  }

  return (
    <PrivateLayout auth={auth}>
      <h2 className="text-2xl font-bold text-gray-100 text-center">Series mới</h2>
      <div className="flex flex-col gap-4 mt-4">
        <div className="mb-2">
          <Input name="name" placeholder="Tên series" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="mb-2">
          <Textarea name="description" placeholder="Mô tả series" value={description ?? ''} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div className="flex justify-between">
          <Label className="text-gray-100">Bài viết</Label>
          <Button variant="outline" title="Thêm bài viết" onClick={() => handleAddNewPostRow()}>
            <PlusIcon className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex flex-col gap-2">
            {seriesPosts.map((seriesPost, index) => (
              <div key={`series-post-${index}`} className="flex justify-between gap-2">
                <Combobox options={posts.map((post) => ({
                  value: post.id.toString(),
                  label: post.title,
                }))}
                handleChange={(value) => handleChangePost(value, index)}
                value={seriesPost.post_id.toString()}
                />
                <Input name="order" placeholder="Thứ tự" value={seriesPost.order === -1 ? '' : seriesPost.order.toString()} onChange={(e) => handleChangeOrder(e.target.value, index)} />
                <Button variant="outline" title="Xóa bài viết" onClick={() => handleDeletePost(index)}>
                  <TrashIcon className="w-4 h-4" />
                </Button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <Button onClick={handleUpdate}>Cập nhật series</Button>
      </div>
    </PrivateLayout>
  );
};

export default EditPage;
