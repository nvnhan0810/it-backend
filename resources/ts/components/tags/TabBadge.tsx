import { Tag } from "@/ts/types/tag";
import { cn } from "@/ts/utils";
import { Link } from "@inertiajs/react";
import { useRoute } from "ziggy-js";

const TagBadge = ({ tag, classes = '', useLink = true }: { tag: Tag, classes?: string, useLink?: boolean, }) => {
  const routes = useRoute();

  return useLink ? (
    <Link href={routes('tags.show', { tag: tag.slug })}>
      <span className={cn(
        "inline-block border rounded-full px-3 py-1 text-sm hover:bg-gray-300 text-nowrap",
        classes
      )}>
        {tag.name.replace(/([a-z])([A-Z])/g, '$1 $2').trim()}
      </span>
    </Link>
  ) : (
    <span className={cn(
      "inline-block border rounded-full px-3 py-1 text-sm text-nowrap dark:bg-gray-500",
      classes
    )}>
      {tag.name.replace(/([a-z])([A-Z])/g, '$1 $2').trim()}
    </span>
  );
};

export default TagBadge;
