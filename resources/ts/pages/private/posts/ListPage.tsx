import PaginationBar from "@/ts/components/common/PaginationBar";
import SearchForm from "@/ts/components/posts/SearchForm";
import TagBadge from "@/ts/components/tags/TabBadge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/ts/components/ui/alert-dialog";
import { Button } from "@/ts/components/ui/button";
import PrivateLayout, { RootProps } from "@/ts/layouts/PrivateLayout";
import { Pagination } from "@/ts/types/common";
import { Post } from "@/ts/types/post";
import { Tag } from "@/ts/types/tag";
import { router } from "@inertiajs/react";
import { format } from "date-fns";
import { Plus } from "lucide-react";
import { useRoute } from "ziggy-js";

type Props = RootProps & {
  posts: Pagination<Post>;
}

const ListPage = ({ auth, posts }: Props) => {
  const route = useRoute();

  const handleDelete = (id: number) => {
    router.delete(route('admin.posts.destroy', id), {
      onSuccess: () => {
        router.reload();
      }
    });
  }

  const DeleteButton = ({ id }: { id: number}) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <span className="text-red-500 cursor-pointer">Delete</span>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xoá bài viết</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn thật sự muốn xóa bài viết này?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500 hover:bg-red-600" onClick={() => handleDelete(id)}>Xoá</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  const handleSearch = (search: string) => {
    router.get(route('admin.index'), { search: search }, {
      preserveUrl: true,
      preserveScroll: true,
      replace: true,
    });
  }

  return (
    <PrivateLayout auth={auth}>
      <div>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-100 text-center">
            Quản Lý bài viết
          </h1>
          <Button variant="outline" title="Thêm bài viết" onClick={() => router.get(route('admin.posts.create'))}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <div className="mb-4 flex justify-start items-center gap-2">
          <SearchForm onSearch={handleSearch} />
        </div>

        <div className="max-w-auto overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 text-gray-900">
              <tr>
                <th className="px-4 py-2 border border-gray-400">ID</th>
                <th className="px-4 py-2 border border-gray-400">Title</th>
                <th className="px-4 py-2 border border-gray-400">Description</th>
                <th className="px-4 py-2 border border-gray-400">Tags</th>
                <th className="px-4 py-2 border border-gray-400">Published At</th>
                <th className="px-4 py-2 border border-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              {posts.data.map((post) => (
                <tr key={post.id}>
                  <td className="px-4 py-2 border border-gray-300">{post.id}</td>
                  <td className="px-4 py-2 border border-gray-300">{post.title}</td>
                  <td className="px-4 py-2 border border-gray-300">{post.description}</td>
                  <td className="px-4 py-2 border border-gray-300">
                    <div className="flex gap-2">
                      {post.tags.map((tag: Tag) => {
                        return <TagBadge key={tag.id} tag={tag} useLink={false} />
                      })}
                    </div>
                  </td>
                  <td className="px-4 py-2 border border-gray-300">{format(post.published_at, 'dd/MM/yyyy')}</td>
                  <td className="px-4 py-2 border border-gray-300">
                    <div className="flex gap-2">
                      <a href={route('admin.posts.edit', post.id)} className="text-blue-500">Edit</a>
                      <DeleteButton id={post.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={6} className="p-4 text-center">
                  <PaginationBar pagination={posts} />
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </PrivateLayout>
  );
};

export default ListPage;
