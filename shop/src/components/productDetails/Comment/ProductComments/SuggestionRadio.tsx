'use client';

import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';

interface Props {
  name?: string;
  onChange: (value: boolean) => void;
  selected?: boolean;
}

export default function SuggestionRadio({ name = 'isRecommended', selected, onChange }: Props) {
  const handleChange = (value: boolean) => {
    onChange(value);
  };

  return (
    <fieldset className="flex items-center gap-4">
      <div className="w-full">
        <input
          type="radio"
          name={name}
          value="true"
          id="suggest-like"
          className="peer hidden"
          checked={selected === true}
          onChange={() => handleChange(true)}
        />
        <label
          htmlFor="suggest-like"
          className="relative block cursor-pointer rounded-lg border p-2 shadow-base peer-checked:border-emerald-500 dark:peer-checked:border-emerald-400"
        >
          <div className="flex items-center gap-x-2 text-emerald-600">
            <AiOutlineLike className="h-5 w-5" />
            <p className="text-sm xs:text-base">می‌کنم</p>
          </div>
        </label>
      </div>

      <div className="w-full">
        <input
          type="radio"
          name={name}
          value="false"
          id="suggest-dislike"
          className="peer hidden"
          checked={selected === false}
          onChange={() => handleChange(false)}
        />
        <label
          htmlFor="suggest-dislike"
          className="relative block cursor-pointer rounded-lg border p-2 shadow-base peer-checked:border-red-500 dark:peer-checked:border-red-400"
        >
          <div className="flex items-center gap-x-2 text-red-500 dark:text-red-400">
            <AiOutlineDislike className="h-5 w-5" />
            <p className="text-sm xs:text-base">نمی‌کنم</p>
          </div>
        </label>
      </div>
    </fieldset>
  );
}
