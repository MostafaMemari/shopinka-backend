import { FC } from 'react';
import { BiUser } from 'react-icons/bi';
import ShareButton from './ShareButton';
import { NoImage } from '@/types/noImageEnum';

interface BlogDetailsViewProps {
  title: string;
  username: string;
  createdAt: string;
  image: string;
  content: string;
}

const BlogDetailsView: FC<BlogDetailsViewProps> = ({ title, username, createdAt, image, content }) => {
  return (
    <div className="rounded-lg bg-muted p-3 shadow-base md:p-5">
      <h1 className="mb-8 font-medium md:text-xl">{title}</h1>
      <div className="mb-8 flex flex-col items-center justify-between gap-4 xs:flex-row">
        <div className="flex items-center gap-x-2 text-sm text-text/90">
          <div className="flex items-center gap-x-2">
            <BiUser className="h-5 w-5" />
            <p className="font-medium">{username}</p>
          </div>
          <div className="h-3 w-px rounded-full bg-background"></div>
          <div>
            {new Date(createdAt).toLocaleDateString('fa-IR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })}
          </div>
        </div>
        <ShareButton />
      </div>
      <div className="mb-8">
        <img src={image || NoImage.BLOG} alt="blog" className="w-full rounded-xl" />
      </div>
      <div
        className="leading-loose prose prose-sm max-w-none p-2 text-text/90"
        style={{ lineHeight: '2', letterSpacing: '.01em' }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default BlogDetailsView;
