import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

interface SuggestionRadioProps {
  name?: string;
  onChange?: (value: string) => void;
  selected?: string;
}

export default function SuggestionRadio({ name = "suggest", selected, onChange }: SuggestionRadioProps) {
  return (
    <fieldset className="flex items-center gap-4">
      <legend className="sr-only">Suggestion</legend>

      <div className="w-full">
        <input
          type="radio"
          name={name}
          value="suggest-like"
          id="suggest-like"
          className="peer hidden"
          checked={selected === "suggest-like"}
          onChange={() => onChange?.("suggest-like")}
        />
        <label
          htmlFor="suggest-like"
          className="relative block cursor-pointer rounded-lg border p-2 shadow-base peer-checked:border-emerald-500 hover:border-border/50 dark:peer-checked:border-emerald-400 dark:hover:border-white/10"
        >
          <div className="flex items-center gap-x-2 text-primary">
            <AiOutlineLike className="h-5 w-5" />
            <p className="text-sm xs:text-base">میکنم</p>
          </div>
        </label>
      </div>

      <div className="w-full">
        <input
          type="radio"
          name={name}
          value="suggest-dislike"
          id="suggest-dislike"
          className="peer hidden"
          checked={selected === "suggest-dislike"}
          onChange={() => onChange?.("suggest-dislike")}
        />
        <label
          htmlFor="suggest-dislike"
          className="relative block cursor-pointer rounded-lg border p-2 shadow-base peer-checked:border-red-500 hover:border-border/50 dark:peer-checked:border-red-400 dark:hover:border-white/10"
        >
          <div className="flex items-center gap-x-2 text-red-500 dark:text-red-400">
            <AiOutlineDislike className="h-5 w-5" />
            <p className="text-sm xs:text-base">نمیکنم</p>
          </div>
        </label>
      </div>
    </fieldset>
  );
}
