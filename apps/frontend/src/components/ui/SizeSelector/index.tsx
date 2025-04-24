interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSizeChange: (size: string) => void;
  label?: string;
}

export default function SizeSelector({ sizes, selectedSize, onSizeChange, label }: SizeSelectorProps) {
  if (!sizes || sizes.length === 0) return null;

  return (
    <div>
      {label && <div className="mb-4">{label}</div>}
      <fieldset className="flex flex-wrap items-center gap-2">
        <legend className="sr-only">Size</legend>
        {sizes.map((size, index) => {
          const value = `size-desktop-${index + 1}`;
          return (
            <div key={value}>
              <input
                type="radio"
                name="size-desktop"
                value={value}
                id={value}
                checked={selectedSize === value}
                onChange={() => onSizeChange(value)}
                className="peer hidden"
              />
              <label
                htmlFor={value}
                className="relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 p-1 shadow-base peer-checked:border-emerald-500 hover:border-border/50 dark:peer-checked:border-emerald-400 dark:hover:border-white/10"
              >
                <p className="text-sm font-bold text-text/90 md:text-base">{size}</p>
              </label>
            </div>
          );
        })}
      </fieldset>
    </div>
  );
}
