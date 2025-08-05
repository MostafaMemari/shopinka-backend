import { BannerType } from '../../enums/banner-type.enum';

export const bannerStub = (type: BannerType = BannerType.MAIN_SLIDER) => {
  return {
    id: 1,
    type,
    link: 'https://shopinka.ir',
    imageId: 1,
    createdAt: new Date('2025-08-05T12:47:23.792Z'),
    updatedAt: new Date('2025-08-05T12:47:23.792Z'),
    isActive: true,
  };
};
