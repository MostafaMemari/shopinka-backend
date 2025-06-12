'use client';

import { FC } from 'react';

const EndMessage: FC = () => {
  return (
    <div className="flex justify-center items-center py-8 animate-fadeIn">
      <div className="text-center">
        <p className="text-lg font-medium text-gray-600 dark:text-gray-300">تمامی محصولات نمایش داده شدند</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">محصولات بیشتری در حال حاضر موجود نیست.</p>
      </div>
    </div>
  );
};

export default EndMessage;
