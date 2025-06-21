import { FC } from 'react';
import { BiCopy, BiShare } from 'react-icons/bi';

const ShareButton: FC = () => {
  return (
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
  );
};

export default ShareButton;
