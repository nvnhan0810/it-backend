import { Tag } from "./tag";

export type Post = {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  published_at: string;
  is_published: boolean;
  public_tags: Tag[];
};
