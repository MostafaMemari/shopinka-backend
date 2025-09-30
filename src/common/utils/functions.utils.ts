import * as sharp from 'sharp';

type SortedObject<T = object> = (object: T) => T;

export const sortObject: SortedObject = (object) => {
  return Object.keys(object)
    .sort()
    .reduce((obj, key) => ({ ...obj, [key]: object[key] }), {});
};

export const transformNumberArray = (value: any) => {
  try {
    if (Array.isArray(value)) return value.map((v) => +v).filter((v) => v > 0);

    const uniqueItems = new Set();
    const parsedValue = JSON.parse(value);
    if (Array.isArray(parsedValue)) {
      parsedValue
        .flat(Infinity)
        .map((item) => (item == null ? item : +item))
        .filter((item) => typeof item == 'number')
        .forEach((item) => uniqueItems.add(item));
      value = [...uniqueItems] as number[];
    }

    if (typeof parsedValue == 'string' || typeof value == 'string') value = [+value];

    return value;
  } catch (error) {
    return value;
  }
};

interface ResizeOption {
  width: number;
  height: number;
  name: string;
  format?: 'jpeg' | 'png' | 'webp';
  quality?: number;
}

interface ResizedImageResult {
  name: string;
  buffer: Buffer;
  info: sharp.OutputInfo;
}

export async function resizeImageWithSharp(input: Buffer | string, size: ResizeOption): Promise<ResizedImageResult> {
  const { width, height, name, format = 'webp', quality = 80 } = size;

  const image = sharp(input).resize(width, height, {
    fit: 'cover',
    position: 'center',
  });

  let formattedImage = image;
  switch (format) {
    case 'jpeg':
      formattedImage = image.jpeg({ quality });
      break;
    case 'png':
      formattedImage = image.png();
      break;
    case 'webp':
    default:
      formattedImage = image.webp({ quality });
      break;
  }

  const { data, info } = await formattedImage.toBuffer({ resolveWithObject: true });

  return {
    name,
    buffer: data,
    info,
  };
}

export function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export const transformToBoolean = (value: string | boolean): boolean => {
  if (typeof value == 'string') return value == 'true';

  return !!value;
};

export const transformToNumber = (value: string | number): number => {
  if (typeof value == 'string') return value.includes('.') ? Number.parseFloat(value) : Number.parseInt(value);

  return value;
};
