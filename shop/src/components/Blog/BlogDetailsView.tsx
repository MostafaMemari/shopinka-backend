import { FC } from 'react';
import Sidebar from './Sidebar';
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
    <div className="grid grid-cols-12 grid-rows-[60px_min(500px,1fr)] gap-4">
      <div className="col-span-12 space-y-4 md:col-span-8 lg:col-span-9">
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
          <div className="leading-loose text-text/90">{content}</div>
        </div>
      </div>
      <Sidebar />
    </div>
  );
};

export default BlogDetailsView;
