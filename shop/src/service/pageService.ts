import { ofetch } from 'ofetch';

export async function getPageBySlug(slug: string) {
  try {
    const res = await ofetch(`/page/by-slug/${slug}`, { baseURL: process.env.API_BASE_URL, method: 'GET', next: { revalidate: 60 } });

    return res;
  } catch (error) {
    return error;
  }
}
