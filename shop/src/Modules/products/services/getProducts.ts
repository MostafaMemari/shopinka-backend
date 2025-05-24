'use server';

export async function fetchSpecialOfferProducts() {
  try {
    const response = await fetch('http://localhost:3600/api/v1/product?includeMainImage=true', {});
    if (!response.ok) throw new Error('خطا در دریافت پیشنهادات شگفت‌انگیز');
    const data = await response.json();

    return data.items;
  } catch (error) {
    console.error('Error fetching special offer products:', error);
  } finally {
  }
}
