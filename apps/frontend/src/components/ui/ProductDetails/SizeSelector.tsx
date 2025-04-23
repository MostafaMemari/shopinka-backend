export default function SizeSelector({
  sizes,
  selectedSize,
  onSizeChange,
}: {
  sizes: string[];
  selectedSize: string;
  onSizeChange: (size: string) => void;
}) {
  return (
    <div>
      <div className="mb-4">انتخاب سایز</div>
      <fieldset className="flex flex-wrap items-center gap-2">
        <legend className="sr-only">Size</legend>
        {sizes?.map((size, index) => (
          <div key={size}>
            <input
              type="radio"
              name="size-desktop"
              value={`size-desktop-${index + 1}`}
              id={`size-desktop-${index + 1}`}
              checked={selectedSize === `size-desktop-${index + 1}`}
              onChange={() => onSizeChange(`size-desktop-${index + 1}`)}
              className="peer hidden"
            />
            <label
              htmlFor={`size-desktop-${index + 1}`}
              className="relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 p-1 shadow-base peer-checked:border-emerald-500 hover:border-border/50 dark:peer-checked:border-emerald-400 dark:hover:border-white/10"
            >
              <p className="text-sm font-bold text-text/90 md:text-base">{size}</p>
            </label>
          </div>
        ))}
      </fieldset>
    </div>
  );
}
