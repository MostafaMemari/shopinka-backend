import { ProductType } from "../../features/product/types/enum";
import { Product } from "../../features/product/types/type";

type Payload = {
  [key: string]: any;
} & Product;

export function getUpdatedPayload(payload: Payload, product: Payload): Partial<Payload> {
  const updatedPayload: Partial<Payload> = {};

  for (const key in payload) {
    if (key !== "relatedProducts") {
      const payloadValue = payload[key];
      const productValue = product[key];

      if ((payloadValue != null || productValue != null) && `${payloadValue}` !== `${productValue}`) {
        updatedPayload[key] = payloadValue;
      }
    }
  }

  if (payload.type !== ProductType.SINGLE && payload?.relatedProducts) {
    // فیلتر کردن آیتم‌هایی که در product.relatedProducts موجود نیستند
    const updatedRelatedProducts = payload.relatedProducts.filter((payloadItem) =>
      product.relatedProducts?.some(
        (productItem) =>
          payloadItem.childProductId == productItem.childProductId && payloadItem.quantity == productItem.quantity
      )
    );

    // اگر آیتم‌های فیلتر شده وجود داشته باشند، آن‌ها را به updatedPayload اضافه می‌کنیم
    if (updatedRelatedProducts.length > 0) {
      updatedPayload.relatedProducts = updatedRelatedProducts;
    }

    // اضافه کردن آیتم‌های جدید که در product.relatedProducts موجود نیستند
    const newRelatedProducts = payload.relatedProducts.filter(
      (payloadItem) =>
        !product.relatedProducts?.some(
          (productItem) =>
            payloadItem.childProductId == productItem.childProductId && payloadItem.quantity == productItem.quantity
        )
    );

    // اگر آیتم‌های جدید پیدا شد، به updatedPayload اضافه می‌کنیم
    if (newRelatedProducts?.length > 0) {
      updatedPayload.relatedProducts = [
        ...(updatedPayload.relatedProducts || []), // در صورتی که قبلاً مقادیری داشته باشد، آن‌ها را حفظ می‌کنیم
        ...newRelatedProducts, // آیتم‌های جدید را اضافه می‌کنیم
      ];
    }
  }

  for (const key in updatedPayload) {
    if (updatedPayload[key] == null) {
      delete updatedPayload[key];
    }
  }

  return updatedPayload;
}
