import usePostPreview from "@/ts/hooks/usePostPreview";
import { Post } from "@/ts/types/post";
import { Link } from "@inertiajs/react";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useRoute } from "ziggy-js";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import PostDetail from "./PostDetail";

type Props = {
  initialPost?: Post;
  onSave: (post: Post) => void;
}

const PostForm = ({ initialPost, onSave }: Props) => {
  const route = useRoute();

  const [doc, setDoc] = useState('');
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const { post, errors, parsePostToContent, parseContentToPost, setPost } = usePostPreview({ initialPost });

  useEffect(() => {
    if (initialPost) {
      let result = parsePostToContent(initialPost);

      setDoc(result);
    }
  }, [initialPost]);

  useEffect(() => {
    parseContentToPost(doc);
  }, [doc]);

  const handleSave = () => {
    if (post) {
      onSave(post);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {post && errors.length > 0 && (
        <div className="text-red-500">
          {errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}

      <div className="flex gap-2 mb-4">
        <div className="flex gap-2 items-center w-1/2">
          <Label>Xuất bản</Label>
          <Switch checked={post?.is_published} onCheckedChange={(checked) => {
            if (post) {
              setPost({
                ...post,
                is_published: checked as boolean,
              });
            }
          }} />
        </div>
        <div className="flex gap-2 items-center w-1/2">
          <Label>Ngày Xuất Bản</Label>
          <Popover open={openDatePicker} onOpenChange={setOpenDatePicker}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date"
                className="w-48 justify-between font-normal"
              >
                {post?.published_at ? format(post.published_at, 'dd/MM/yyyy') : "Chọn ngày"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0 bg-slate-800" align="start">
              <Calendar
                mode="single"
                selected={post?.published_at ? new Date(post.published_at) : undefined}
                captionLayout="dropdown"
                onSelect={(date) => {
                  if (post) {
                    setPost({
                      ...post,
                      published_at: date?.toISOString() ?? '',
                    });
                  }
                  setOpenDatePicker(false)
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex">
        <div className="w-1/2 flex flex-col gap-2">
          <Textarea placeholder="Nhập tiêu đề" className="border-gray-700 min-h-[200px]" value={doc} onChange={(e) => setDoc(e.target.value)} />
        </div>
        <div className="flex flex-col gap-2 px-4 w-1/2">
          {post && <PostDetail post={post} />}
        </div>
      </div>

      <div className="flex justify-end sticky bottom-0 left-0 right-0 border-t p-4 mt-4 justify-center bg-gray-800 gap-2">
        <Button variant="outline" asChild className="text-gray-100">
          <Link href={route('admin.index')}>Quay Lại</Link>
        </Button>
        <Button variant="outline" onClick={handleSave} disabled={errors.length > 0}>Lưu</Button>
      </div>
    </div>
  );
};

export default PostForm;
