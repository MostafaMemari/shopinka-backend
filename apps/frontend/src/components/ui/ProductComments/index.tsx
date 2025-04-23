import React from "react";

interface Comment {
  id: string;
  title: string;
  content: string;
  date: string;
  isRecommended: boolean;
  isBuyer: boolean;
  likes: number;
  dislikes: number;
  replies?: Comment[];
}

interface ProductCommentsProps {
  comments: Comment[];
}

const ProductComments = ({ comments }: ProductCommentsProps) => {
  return (
    <div className="py-6" id="comments">
      <div className="relative mb-16 w-fit text-xl font-medium">
        دیدگاه ها
        <span className="absolute right-0 top-10 h-[3px] w-full rounded-full bg-primary"></span>
      </div>

      <div>
        <div className="grid grid-cols-12 gap-y-8 md:gap-8">
          {/* Submit New Comment */}
          <div className="col-span-12 md:col-span-4 lg:col-span-3">
            <div className="grid grid-cols-2 gap-4 md:sticky md:top-32">
              <div className="text-lg">ثبت دیدگاه</div>
              <div className="col-span-2">
                {/* Suggestion */}
                <div className="mb-4 text-sm text-text/60">این محصول را به دیگران پیشنهاد</div>
                <fieldset className="flex items-center gap-4">
                  <legend className="sr-only">Suggestion</legend>

                  <div className="w-full">
                    <input type="radio" name="suggest" value="suggest-like" id="suggest-like" className="peer hidden" />
                    <label
                      htmlFor="suggest-like"
                      className="relative block cursor-pointer rounded-lg border p-2 shadow-base peer-checked:border-emerald-500 hover:border-border/50 dark:peer-checked:border-emerald-400 dark:hover:border-white/10"
                    >
                      <div className="flex items-center gap-x-2 text-primary">
                        <svg className="h-5 w-5">
                          <use xlinkHref="#like" />
                        </svg>
                        <p className="text-sm xs:text-base">میکنم</p>
                      </div>
                    </label>
                  </div>

                  <div className="w-full">
                    <input type="radio" name="suggest" value="suggest-dislike" id="suggest-dislike" className="peer hidden" />
                    <label
                      htmlFor="suggest-dislike"
                      className="relative block cursor-pointer rounded-lg border p-2 shadow-base peer-checked:border-red-500 hover:border-border/50 dark:peer-checked:border-red-400 dark:hover:border-white/10"
                    >
                      <div className="flex items-center gap-x-2 text-red-500 dark:text-red-400">
                        <svg className="h-5 w-5">
                          <use xlinkHref="#dislike" />
                        </svg>
                        <p className="text-sm xs:text-base">نمیکنم</p>
                      </div>
                    </label>
                  </div>
                </fieldset>
              </div>
              <div className="col-span-2">
                <label htmlFor="comment" className="relative block rounded-lg border shadow-base">
                  <textarea
                    id="comment"
                    rows={3}
                    className="main-scroll peer w-full rounded-lg border-none bg-transparent px-4 py-3 placeholder-transparent focus:outline-hidden focus:ring-0"
                    placeholder="متن دیدگاه"
                  ></textarea>
                  <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-muted px-2 py-0.5 text-sm text-text/90 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">
                    متن دیدگاه
                  </span>
                </label>
              </div>
              <div className="col-span-2 flex justify-end">
                <button className="btn-primary w-full px-4 py-2 md:w-auto">ارسال دیدگاه</button>
              </div>
            </div>
          </div>

          {/* Comments List */}
          <div
            className="order-first col-span-12 mb-10 max-h-[500px] overflow-hidden md:order-last md:col-span-8 lg:col-span-9"
            id="commentsContainer"
          >
            {/* Desktop Comments */}
            <div className="hidden md:block">
              <ul className="mb-8 space-y-4 divide-y divide-gray-200 dark:divide-white/10">
                {comments &&
                  comments?.map((comment) => (
                    <li key={comment.id} className="space-y-2">
                      <div className="py-6">
                        <div className="flex items-center justify-between gap-2">
                          <h5 className="mb-4 leading-relaxed xl:text-lg">{comment.title}</h5>
                          <button
                            data-modal-target="submit-answers-to-comments-drawer-navigation"
                            data-modal-toggle="submit-answers-to-comments-drawer-navigation"
                            type="button"
                            className="btn-secondary-nobg"
                          >
                            پاسخ
                            <svg className="h-5 w-5">
                              <use xlinkHref="#chevron-left" />
                            </svg>
                          </button>
                        </div>
                        <div className="mb-6 flex items-center gap-x-4 border-b pb-6">
                          <div
                            className={`flex items-center gap-x-2 ${comment.isRecommended ? "text-primary" : "text-red-500 dark:text-red-400"}`}
                          >
                            <svg className="h-5 w-5">
                              <use xlinkHref={comment.isRecommended ? "#like" : "#dislike"} />
                            </svg>
                            {comment.isRecommended ? "پیشنهاد میکنم" : "پیشنهاد نمیکنم"}
                          </div>
                          <div className="flex items-center gap-x-2">
                            <div className="text-sm text-text/60">{comment.date}</div>
                            <span className="h-3 w-px rounded-full bg-background dark:bg-muted/10"></span>
                            <div className="text-sm text-text/60">{comment.isBuyer ? "خریدار" : "کاربر"}</div>
                          </div>
                        </div>
                        <div className="mb-6 border-b pb-6">
                          <p className="line-clamp-4 text-sm text-text/90">{comment.content}</p>
                        </div>
                        <div className="flex items-center justify-end gap-x-8">
                          <div className="text-sm text-text/60">آیا این دیدگاه برایتان مفید بود؟</div>
                          <button className="flex items-center gap-x-2 text-primary transition-all duration-200 hover:text-emerald-400 dark:hover:text-primary">
                            <span className="text-sm">{comment.likes}</span>
                            <svg className="h-6 w-6">
                              <use xlinkHref="#like" />
                            </svg>
                          </button>
                          <button className="flex items-center gap-x-2 text-red-500 transition-all duration-200 hover:text-red-400 dark:text-red-400 dark:hover:text-red-500">
                            <span className="text-sm">{comment.dislikes}</span>
                            <svg className="h-6 w-6">
                              <use xlinkHref="#dislike" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      {/* Replies */}
                      {comment.replies && comment.replies.length > 0 && (
                        <ul className="space-y-2">
                          {comment.replies.map((reply) => (
                            <li key={reply.id}>
                              <div className="py-6 pr-8 border-r dark:border-white/10">
                                <div className="flex items-center justify-between">
                                  <h5 className="mb-4 leading-relaxed xl:text-lg">{reply.title}</h5>
                                  <button
                                    data-modal-target="submit-answers-to-comments-drawer-navigation"
                                    data-modal-toggle="submit-answers-to-comments-drawer-navigation"
                                    type="button"
                                    className="btn-secondary-nobg"
                                  >
                                    پاسخ
                                    <svg className="h-5 w-5">
                                      <use xlinkHref="#chevron-left" />
                                    </svg>
                                  </button>
                                </div>
                                <div className="mb-6 flex items-center gap-x-4 border-b pb-6">
                                  <div className="flex items-center gap-x-2">
                                    <div className="text-sm text-text/60">{reply.date}</div>
                                    <span className="h-3 w-px rounded-full bg-grauy-200 /10"></span>
                                    <div className="text-sm text-text/60">{reply.isBuyer ? "خریدار" : "کاربر"}</div>
                                  </div>
                                </div>
                                <div className="mb-6 border-b pb-6">
                                  <p className="line-clamp-4 text-sm text-text/90">{reply.content}</p>
                                </div>
                                <div className="flex items-center justify-end gap-x-8">
                                  <div className="text-sm text-text/60">آیا این دیدگاه برایتان مفید بود؟</div>
                                  <button className="flex items-center gap-x-2 text-primary transition-all duration-200 hover:text-emerald-400 dark:hover:text-primary">
                                    <span className="text-sm">{reply.likes}</span>
                                    <svg className="h-6 w-6">
                                      <use xlinkHref="#like" />
                                    </svg>
                                  </button>
                                  <button className="flex items-center gap-x-2 text-red-500 transition-all duration-200 hover:text-red-400 dark:text-red-400 dark:hover:text-red-500">
                                    <span className="text-sm">{reply.dislikes}</span>
                                    <svg className="h-6 w-6">
                                      <use xlinkHref="#dislike" />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
              </ul>
              {/* Pagination */}
              <div className="flex items-center justify-center gap-x-4 md:justify-end">
                <a className="pagination-button flex items-center justify-center" href="#">
                  <svg className="h-6 w-6">
                    <use xlinkHref="#chevron-right"></use>
                  </svg>
                </a>
                <div className="flex items-center gap-x-2">
                  <a className="pagination-button pagination-button-active" href="#">
                    1
                  </a>
                  <p className="text-sm text-text/60">...</p>
                  <a className="pagination-button" href="#">
                    3
                  </a>
                  <a className="pagination-button" href="#">
                    4
                  </a>
                  <p className="text-sm text-text/60">...</p>
                  <a className="pagination-button" href="#">
                    10
                  </a>
                </div>
                <a
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-muted transition-all duration-200 hover:bg-primary hover:text-white dark:hover:bg-emerald-600"
                  href="#"
                >
                  <svg className="h-6 w-6">
                    <use xlinkHref="#chevron-left"></use>
                  </svg>
                </a>
              </div>
            </div>

            {/* Mobile Comments */}
            <div className="md:hidden">
              <div className="swiper product-comments-swiper">
                <div className="swiper-wrapper">
                  {comments &&
                    comments.map((comment) => (
                      <div key={comment.id} className="swiper-slide">
                        <div className="flex h-64 flex-col rounded-lg border px-4 py-6">
                          <div className="flex items-center justify-between gap-2 mb-4">
                            <div
                              className={`flex items-center gap-x-2 ${comment.isRecommended ? "text-primary" : "text-red-500 dark:text-red-400"}`}
                            >
                              <svg className="h-5 w-5">
                                <use xlinkHref={comment.isRecommended ? "#like" : "#dislike"} />
                              </svg>
                              {comment.isRecommended ? "پیشنهاد میکنم" : "پیشنهاد نمیکنم"}
                            </div>
                            <button
                              data-modal-target="submit-answers-to-comments-drawer-navigation"
                              data-modal-toggle="submit-answers-to-comments-drawer-navigation"
                              type="button"
                              className="btn-secondary-nobg"
                            >
                              پاسخ
                              <svg className="h-5 w-5">
                                <use xlinkHref="#chevron-left" />
                              </svg>
                            </button>
                          </div>
                          <div className="grow space-y-2">
                            <h5 className="text-sm leading-relaxed">{comment.title}</h5>
                            <p className="line-clamp-4 text-sm leading-relaxed text-text/90">{comment.content}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-x-4">
                              <button className="relative text-primary">
                                <svg className="h-6 w-6">
                                  <use xlinkHref="#like" />
                                </svg>
                                <span className="absolute -right-2 top-6 text-sm">{comment.likes}</span>
                              </button>
                              <button className="relative text-red-500 dark:text-red-400">
                                <svg className="h-6 w-6">
                                  <use xlinkHref="#dislike" />
                                </svg>
                                <span className="absolute -right-2 top-6 text-sm">{comment.dislikes}</span>
                              </button>
                            </div>
                            <div className="flex items-center gap-x-2">
                              <div className="text-xs text-text/60">{comment.date}</div>
                              <span className="h-3 w-px rounded-full bg-background dark:bg-muted/10"></span>
                              <div className="text-xs text-text/60">{comment.isBuyer ? "خریدار" : "کاربر"}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  {/* Load More */}
                  <div className="swiper-slide">
                    <div className="flex h-64 items-center justify-center">
                      <button
                        aria-controls="mobile-comments-drawer-navigation"
                        data-drawer-show="mobile-comments-drawer-navigation"
                        data-drawer-placement="bottom"
                        data-drawer-target="mobile-comments-drawer-navigation"
                        type="button"
                        className="flex flex-col items-center justify-center gap-y-4 text-primary"
                      >
                        <div className="rounded-full border border-emerald-500 p-2 dark:border-emerald-400">
                          <svg className="h-6 w-6">
                            <use xlinkHref="#chevron-left" />
                          </svg>
                        </div>
                        <div>مشاهده بیشتر</div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductComments;
