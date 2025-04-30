import { useState } from "react";

interface ProductSelection {
  quantity: number;
  selectedColor: string;
  selectedSize: string;
  setQuantity: (quantity: number) => void;
  setSelectedColor: (color: string) => void;
  setSelectedSize: (size: string) => void;
  handleIncrement: () => void;
  handleDecrement: () => void;
}

export const useProductSelection = (defaultColor = "color-1", defaultSize = "size-1", defaultQuantity = 1): ProductSelection => {
  const [quantity, setQuantity] = useState<number>(defaultQuantity);
  const [selectedColor, setSelectedColor] = useState<string>(defaultColor);
  const [selectedSize, setSelectedSize] = useState<string>(defaultSize);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return {
    quantity,
    selectedColor,
    selectedSize,
    setQuantity,
    setSelectedColor,
    setSelectedSize,
    handleIncrement,
    handleDecrement,
  };
};
