"use client";

interface AddToCartButtonDesktopProps {
  onAddToCart: () => void;
}

const AddToCartButtonDesktop: React.FC<AddToCartButtonDesktopProps> = ({ onAddToCart }) => {
  return (
    <div className="mb-6">
      <button onClick={onAddToCart} className="btn-primary w-full py-3">
        افزودن به سبد خرید
      </button>
    </div>
  );
};

export default AddToCartButtonDesktop;
