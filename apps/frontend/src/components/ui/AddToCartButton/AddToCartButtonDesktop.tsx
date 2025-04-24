"use client";

interface Props {
  onAddToCart?: () => void;
}

export default function AddToCartButtonDesktop({ onAddToCart }: Props) {
  return (
    <div className="mb-6">
      <button onClick={onAddToCart} className="btn-primary w-full py-3">
        افزودن به سبد خرید
      </button>
    </div>
  );
}
