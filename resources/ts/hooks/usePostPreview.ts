import { useState } from "react";
import { Post } from "../types/post";

type Props = {
  initialPost?: Post;
}

const usePostPreview = ({ initialPost }: Props) => {
  const [post, setPost] = useState<Post | undefined>(initialPost);
  const [errors, setErrors] = useState<string[]>([]);

  const checkSyntax = (content: string[], type: 'title' | 'description' | 'tags'): { index: number, result: string } => {
    const syntaxes = {
      title: '# ',
      description: '> ',
      tags: 'Tags: ',
    }

    const syntax = syntaxes[type];

    if (!syntax) {
      return {
        index: -1,
        result: '',
      };
    }

    let isChecking = true;
    let index = -1;
    let result = '';

    for (let i = 0; i < content.length; i++) {
      const item = content[i];

      if ((!isChecking || item !== '') && !item.startsWith(syntax)) {
        break;
      }

      if (item.startsWith(syntax)) {
        index = i;
        isChecking = false;
        result = item.replace(new RegExp(`^${syntax}`), '');
      }
    }

    return {
      index,
      result,
    };
  }

  const parseContentToPost = (content: string) => {
    let contentArr = content?.split('\n') ?? [];

    if (contentArr.length < 0) {
      return;
    }

    let { result: title, index: titleIndex } = checkSyntax(contentArr, 'title');
    if (titleIndex > -1) {
      contentArr = contentArr.slice(titleIndex + 1);
    }

    let { result: tagStr, index: tagsIndex } = checkSyntax(contentArr, 'tags');
    let tags: string[] = [];
    if (tagsIndex > -1) {
      contentArr = contentArr.slice(tagsIndex + 1);
      tags = tagStr.split(',');
    }

    let { result: description, index: descriptionIndex } = checkSyntax(contentArr, 'description');
    if (descriptionIndex > -1) {
      contentArr = contentArr.slice(descriptionIndex + 1);
    }

    let body = contentArr.join('\n');

    let errorMessages: string[] = [];

    if (title === '') {
      errorMessages.push('Title is required');
    }

    if (body === '') {
      errorMessages.push('Body is required');
    }

    if (errorMessages.length > 0 || errors.length != errorMessages.length) {
      setErrors([...errorMessages]);
    }

    setPost({
      ...(post ?? {
        id: 0,
        published_at: (new Date()).toISOString(),
        is_published: false,
      }),
      ...{
        title: title,
        slug: post?.slug ?? '',
        description: description,
        content: body,
        tags: tags.length > 0 ? tags.map((tag, index) => ({
          id: index + 1,
          name: tag,
          slug: tag,
        })) : [],
        public_tags: tags.length > 0 ? tags.map((tag, index) => ({
          id: index + 1,
          name: tag,
          slug: tag.toLowerCase().replace(/ /g, '-'),
        })) : [],
      }
    });
  }

  const parsePostToContent = (post: Post) => {
    let content = `# ${post.title}\n\n`;

    if (post.tags && post.tags.length > 0) {
      content += `Tags: ${post.tags.map((tag) => tag.name).join(',')}\n\n`;
    }

    if (post.description) {
      content += `> ${post.description}\n\n`;
    }

    content += `${post.content}`;

    return content;
  }

  return { post, errors, parseContentToPost, parsePostToContent, setPost };
}

export default usePostPreview;
