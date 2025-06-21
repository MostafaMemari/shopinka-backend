import { BlogItem } from '@/types/blogType';
import { FC } from 'react';

import { BiChevronLeft, BiCopy, BiShare, BiUser } from 'react-icons/bi';
interface BlogDetailsViewProps {
  blog: BlogItem;
}

const BlogDetailsView: FC<BlogDetailsViewProps> = ({ blog }) => {
  console.log(blog);
  return (
    <>
      <div className="grid grid-cols-12 grid-rows-[60px_min(500px,1fr)] gap-4">
        <div className="col-span-12 space-y-4 md:col-span-8 lg:col-span-9">
          <div className="rounded-lg bg-muted p-3 shadow-base md:p-5">
            <h1 className="mb-8 font-medium md:text-xl">{blog.title}</h1>

            <div className="mb-8 flex flex-col items-center justify-between gap-4 xs:flex-row">
              <div className="flex items-center gap-x-2 text-sm text-text/90">
                <div className="flex items-center gap-x-2">
                  <BiUser className="h-5 w-5" />

                  <p className="font-medium">{blog.user.fullName}</p>
                </div>
                <div className="h-3 w-px rounded-full bg-background"></div>
                <div>
                  {new Date(blog.createdAt).toLocaleDateString('fa-IR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })}
                </div>
              </div>
              <div>
                <button
                  id="dropdownMenuCopySocialShareLink"
                  data-dropdown-toggle="copy-social-share-link"
                  data-tooltip-target="share-on-social"
                  type="button"
                  className="btn-primary-nobg"
                >
                  <BiShare className="h-5 w-5" />
                  اشتراک گذاری
                </button>

                <div className="z-10 ml-5! hidden w-50 overflow-hidden rounded-lg border bg-muted shadow-base" id="copy-social-share-link">
                  <ul className="space-y-2 p-2">
                    <li>
                      <button
                        type="button"
                        data-link="https://www.google.com"
                        className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-sky-500 hover:bg-sky-500/10 dark:text-sky-400 dark:hover:bg-sky-400/10"
                      >
                        <div className="flex items-center gap-x-2">
                          <BiCopy className="h-6 w-6" />

                          <span id="copyToClipboardSocialShareText">کپی کردن لینک</span>
                        </div>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mb-8">
              <img src={blog.mainImage?.fileUrl} alt="blog" className="w-full rounded-xl" />
            </div>
            <div className="leading-loose text-text/90">{blog.content}</div>
          </div>
        </div>

        <div className="col-span-4 row-span-2 hidden md:block lg:col-span-3">
          <div className="sticky top-32 mb-4 overflow-hidden">
            <div className="mb-8 rounded-lg bg-muted px-2 py-3 shadow-base xl:px-4">
              <p className="mb-4 text-center text-sm font-medium xl:text-base">مطالب مرتبط</p>
              <ul className="space-y-8">
                <li>
                  <a href="#">
                    <div className="flex gap-x-2 xl:gap-x-4">
                      <div className="min-w-fit">
                        <img src="./assets/images/blog/blog1.jpg" alt="blog" className="w-25 rounded-xl xl:w-32" />
                      </div>
                      <div className="flex flex-col gap-y-2">
                        <p className="line-clamp-2 text-sm text-text/90 xl:text-base">نحوه انتقال مخاطبین از گوشی آیفون به اندروید</p>
                        <p className="text-xs text-text/60 xl:text-sm">1402 / شهریور / 20</p>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <div className="flex gap-x-2 xl:gap-x-4">
                      <div className="min-w-fit">
                        <img src="./assets/images/blog/blog1.jpg" alt="blog" className="w-25 rounded-xl xl:w-32" />
                      </div>
                      <div className="flex flex-col gap-y-2">
                        <p className="line-clamp-2 text-sm text-text/90 xl:text-base">نحوه انتقال مخاطبین از گوشی آیفون به اندروید</p>
                        <p className="text-xs text-text/60 xl:text-sm">1402 / شهریور / 20</p>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <div className="flex gap-x-2 xl:gap-x-4">
                      <div className="min-w-fit">
                        <img src="./assets/images/blog/blog1.jpg" alt="blog" className="w-25 rounded-xl xl:w-32" />
                      </div>
                      <div className="flex flex-col gap-y-2">
                        <p className="line-clamp-2 text-sm text-text/90 xl:text-base">نحوه انتقال مخاطبین از گوشی آیفون به اندروید</p>
                        <p className="text-xs text-text/60 xl:text-sm">1402 / شهریور / 20</p>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <div className="flex gap-x-2 xl:gap-x-4">
                      <div className="min-w-fit">
                        <img src="./assets/images/blog/blog1.jpg" alt="blog" className="w-25 rounded-xl xl:w-32" />
                      </div>
                      <div className="flex flex-col gap-y-2">
                        <p className="line-clamp-2 text-sm text-text/90 xl:text-base">نحوه انتقال مخاطبین از گوشی آیفون به اندروید</p>
                        <p className="text-xs text-text/60 xl:text-sm">1402 / شهریور / 20</p>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#" className="btn-primary py-2">
                    مشاهده همه ( 20 )
                  </a>
                </li>
              </ul>
            </div>

            <div className="mb-8 rounded-lg bg-muted px-2 py-3 shadow-base xl:px-4">
              <p className="mb-4 text-center text-sm font-medium xl:text-base">مطالب محبوب</p>
              <ul className="space-y-8">
                <li>
                  <a href="#">
                    <div className="flex gap-x-2 xl:gap-x-4">
                      <div className="min-w-fit">
                        <img src="./assets/images/blog/blog1.jpg" alt="blog" className="w-25 rounded-xl xl:w-32" />
                      </div>
                      <div className="flex flex-col gap-y-2">
                        <p className="line-clamp-2 text-sm text-text/90 xl:text-base">نحوه انتقال مخاطبین از گوشی آیفون به اندروید</p>
                        <p className="text-xs text-text/60 xl:text-sm">1402 / شهریور / 20</p>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <div className="flex gap-x-2 xl:gap-x-4">
                      <div className="min-w-fit">
                        <img src="./assets/images/blog/blog1.jpg" alt="blog" className="w-25 rounded-xl xl:w-32" />
                      </div>
                      <div className="flex flex-col gap-y-2">
                        <p className="line-clamp-2 text-sm text-text/90 xl:text-base">نحوه انتقال مخاطبین از گوشی آیفون به اندروید</p>
                        <p className="text-xs text-text/60 xl:text-sm">1402 / شهریور / 20</p>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <div className="flex gap-x-2 xl:gap-x-4">
                      <div className="min-w-fit">
                        <img src="./assets/images/blog/blog1.jpg" alt="blog" className="w-25 rounded-xl xl:w-32" />
                      </div>
                      <div className="flex flex-col gap-y-2">
                        <p className="line-clamp-2 text-sm text-text/90 xl:text-base">نحوه انتقال مخاطبین از گوشی آیفون به اندروید</p>
                        <p className="text-xs text-text/60 xl:text-sm">1402 / شهریور / 20</p>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>

            <div className="mb-8 rounded-lg bg-muted px-2 py-3 shadow-base xl:px-4">
              <p className="mb-4 text-center text-sm font-medium xl:text-base">دسته‌بندی ها</p>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="group py-2">
                    <div className="flex items-center justify-between">
                      <p className="flex items-center gap-x-2 text-sm text-text/90 transition-all duration-200 group-hover: group-hover: xl:text-base">
                        <BiChevronLeft className="h-4 w-4" />
                        دسته بندی اول
                      </p>
                      <div className="w-6 rounded-lg bg-primary py-px text-center text-sm font-medium text-white dark:bg-emerald-600">
                        20
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#" className="group py-2">
                    <div className="flex items-center justify-between">
                      <p className="flex items-center gap-x-2 text-sm text-text/90 transition-all duration-200 group-hover: group-hover: xl:text-base">
                        <BiChevronLeft className="h-4 w-4" />
                        دسته بندی دوم
                      </p>
                      <div className="w-6 rounded-lg bg-primary py-px text-center text-sm font-medium text-white dark:bg-emerald-600">
                        20
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#" className="group py-2">
                    <div className="flex items-center justify-between">
                      <p className="flex items-center gap-x-2 text-sm text-text/90 transition-all duration-200 group-hover: group-hover: xl:text-base">
                        <BiChevronLeft className="h-4 w-4" />
                        دسته بندی سوم
                      </p>
                      <div className="w-6 rounded-lg bg-primary py-px text-center text-sm font-medium text-white dark:bg-emerald-600">
                        20
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#" className="group py-2">
                    <div className="flex items-center justify-between">
                      <p className="flex items-center gap-x-2 text-sm text-text/90 transition-all duration-200 group-hover: group-hover: xl:text-base">
                        <svg className="h-4 w-4" />
                        دسته بندی چهارم
                      </p>
                      <div className="w-6 rounded-lg bg-primary py-px text-center text-sm font-medium text-white dark:bg-emerald-600">
                        20
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetailsView;
