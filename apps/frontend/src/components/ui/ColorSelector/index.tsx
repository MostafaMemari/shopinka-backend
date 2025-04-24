interface Color {
  id: string;
  name: string;
  color: string;
}

export const ColorSelector = ({
  colors,
  selectedColor,
  onColorChange,
  label,
}: {
  colors: Color[];
  selectedColor: string;
  onColorChange: (id: string) => void;
  label?: string;
}) => {
  if (!colors || colors.length === 0) return null;

  return (
    <div>
      {label && <div className="mb-4">{label}</div>}
      <fieldset className="flex flex-wrap items-center gap-1">
        <legend className="sr-only">Color</legend>
        {colors.map((color) => (
          <div key={color.id}>
            <input
              type="radio"
              name="color-desktop"
              value={color.id}
              id={color.id}
              checked={selectedColor === color.id}
              onChange={() => onColorChange(color.id)}
              className="peer hidden"
            />
            <label
              htmlFor={color.id}
              className="relative block cursor-pointer rounded-full border-2 p-2 shadow-base peer-checked:border-emerald-500 hover:border-border/50 dark:peer-checked:border-emerald-400 dark:hover:border-white/10"
            >
              <div className="flex items-center gap-x-2">
                <div
                  className="h-6 w-6 rounded-full border-2 shadow-base dark:border-white/30"
                  style={{ backgroundColor: color.color }}
                ></div>
                <p className="text-text/90">{color.name}</p>
              </div>
            </label>
          </div>
        ))}
      </fieldset>
    </div>
  );
};
