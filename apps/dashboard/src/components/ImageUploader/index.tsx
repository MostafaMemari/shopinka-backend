import { useEffect, useState } from "react";
import { useController } from "react-hook-form";

interface ImageUploaderProps {
  control: any;
  name: string;
  resetImage?: boolean; // پراپ جدید برای ریست کردن تصویر
  imageUrl?: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ control, name, imageUrl }) => {
  const { field } = useController({ control, name });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (imageUrl) setSelectedImage(imageUrl);
  }, [imageUrl]);

  // ریست تصویر با استفاده از reset
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        field.onChange(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
    field.onChange(null);
  };

  return (
    <>
      <img
        src={selectedImage || "https://via.placeholder.com/150"}
        alt="Uploaded Preview"
        className="max-h-40 rounded-md border mb-4"
      />
      <div className="flex space-x-2 space-x-reverse">
        {!selectedImage ? (
          <label className="rounded-md bg-blue-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none cursor-pointer">
            آپلود عکس
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>
        ) : (
          <button
            type="button"
            onClick={handleImageRemove}
            className="rounded-md bg-red-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none"
          >
            حذف عکس
          </button>
        )}
      </div>
    </>
  );
};

export default ImageUploader;
