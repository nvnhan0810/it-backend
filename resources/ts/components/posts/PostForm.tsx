import usePostPreview from "@/ts/hooks/usePostPreview";
import { Post } from "@/ts/types/post";
import { Link } from "@inertiajs/react";
import { format } from "date-fns";
import { ChevronDownIcon, PlusIcon, SidebarIcon, XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRoute } from "ziggy-js";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import PostDetail from "./PostDetail";
import { cn } from "@/ts/utils";
import type { Series } from "@/ts/types/series";
import { Checkbox } from "../ui/checkbox";

type Props = {
  initialPost?: Post;
  onSave: (post: Post & { series_ids: number[] }) => void;
  series: Series[];
  selectedSeriesIds?: number[];
};

const PostForm = ({ initialPost, onSave, series, selectedSeriesIds = [] }: Props) => {
  const route = useRoute();
  const postDetailRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [seriesIds, setSeriesIds] = useState<number[]>(selectedSeriesIds);
  const [showSidebar, setShowSidebar] = useState(false);
  const [doc, setDoc] = useState("");
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const { post, errors, parsePostToContent, parseContentToPost, setPost } =
    usePostPreview({ initialPost });

  useEffect(() => {
    if (initialPost) {
      let result = parsePostToContent(initialPost);
      setDoc(result);
    }
  }, [initialPost]);

  useEffect(() => {
    parseContentToPost(doc);
  }, [doc]);

  // Sync textarea height with PostDetail height
  useEffect(() => {
    const syncHeight = () => {
      if (postDetailRef.current && textareaRef.current) {
        const postDetailHeight = postDetailRef.current.offsetHeight;
        textareaRef.current.style.height = `${postDetailHeight}px`;
      }
    };

    // Initial sync
    syncHeight();

    // Sync on window resize
    window.addEventListener("resize", syncHeight);

    // Use ResizeObserver to watch for PostDetail height changes
    if (postDetailRef.current) {
      const resizeObserver = new ResizeObserver(syncHeight);
      resizeObserver.observe(postDetailRef.current);

      return () => {
        resizeObserver.disconnect();
        window.removeEventListener("resize", syncHeight);
      };
    }

    return () => {
      window.removeEventListener("resize", syncHeight);
    };
  }, [post]);

  const handleSave = () => {
    if (post) {
      onSave({
        ...post,
        series_ids: seriesIds,
      });
    }
  };

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
        <Button variant="outline" onClick={() => setShowSidebar(!showSidebar)}>
          <SidebarIcon className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="w-1/2 flex flex-col gap-2">
          <Textarea
            ref={textareaRef}
            placeholder="Nhập tiêu đề"
            className="border-gray-700 resize-none overflow-y-auto min-h-[200px]"
            value={doc}
            onChange={(e) => setDoc(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 px-4 w-1/2">
          <div ref={postDetailRef}>{post && <PostDetail post={post} />}</div>
        </div>
      </div>

      <div className="flex justify-end sticky bottom-0 left-0 right-0 border-t p-4 mt-4 justify-center bg-gray-800 gap-2">
        <Button variant="outline" asChild className="text-gray-100">
          <Link href={route("admin.index")}>Quay Lại</Link>
        </Button>
        <Button
          variant="outline"
          onClick={handleSave}
          disabled={errors.length > 0}
        >
          Lưu
        </Button>
      </div>

      {/* Right Sidebar Config */}
      <div
        className={cn(
          "bg-zinc-900/90 absolute right-0 top-0 bottom-0 left-0 z-50",
          {
            hidden: !showSidebar,
            block: showSidebar,
          }
        )}
      >
        <div className="w-96 bg-background border-l border-gray-700 absolute right-0 top-0 bottom-0 z-100 p-4">
          <div className="flex items-center justify-end mb-4">
            <Button variant="outline" onClick={() => setShowSidebar(false)}>
              <XIcon className="w-4 h-4 text-gray-100" />
            </Button>
          </div>

          <div className="flex gap-2 items-center mb-4">
            <Label>Xuất bản</Label>
            <Switch
              checked={post?.is_published}
              onCheckedChange={(checked) => {
                if (post) {
                  setPost({
                    ...post,
                    is_published: checked as boolean,
                  });
                }
              }}
            />
          </div>

          <div className="flex gap-2 items-center mb-4">
            <Label>Ngày Xuất Bản</Label>
            <Popover open={openDatePicker} onOpenChange={setOpenDatePicker}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date"
                  className="w-48 justify-between font-normal"
                >
                  {post?.published_at
                    ? format(post.published_at, "dd/MM/yyyy")
                    : "Chọn ngày"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0 bg-slate-800"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={
                    post?.published_at ? new Date(post.published_at) : undefined
                  }
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    if (post) {
                      setPost({
                        ...post,
                        published_at: date?.toISOString() ?? "",
                      });
                    }
                    setOpenDatePicker(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-col gap-2 mb-4">
          <Label>Danh sách series</Label>
          <div className="flex flex-col gap-2 py-4">
            {series.map((series) => (
              <div key={series.id} className="flex gap-3 items-center">
                <Checkbox
                  checked={seriesIds?.includes(series.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSeriesIds([...seriesIds, series.id]);
                    } else {
                      setSeriesIds(seriesIds.filter((id) => id !== series.id));
                    }
                  }}
                />
                <span>{series.name}</span>
              </div>
            ))}
          </div>
          <Button variant="outline">
            <PlusIcon className="w-4 h-4" />
          </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
