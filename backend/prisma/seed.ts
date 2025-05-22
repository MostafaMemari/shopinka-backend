import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      id: 1,
      fullName: 'MostafaMemari',
      role: 'SUPER_ADMIN',
      mobile: '09388366510',
    },
  });

  await prisma.attribute.createMany({
    data: [
      {
        id: 1,
        name: 'انتخاب رنگ',
        slug: 'color-selector',
        type: 'COLOR',
        userId: 1,
      },
      {
        id: 2,
        name: 'انتخاب سایز',
        slug: 'elect-size',
        type: 'BUTTON',
        userId: 1,
      },
    ],
  });

  await prisma.attributeValue.createMany({
    data: [
      {
        id: 2,
        name: 'سفید',
        slug: 'white',
        colorCode: '#ededed',
        attributeId: 1,
      },
      {
        id: 3,
        name: 'قرمز',
        slug: 'red',
        colorCode: '#f41e1e',
        attributeId: 1,
      },
      {
        id: 4,
        name: 'مشکی',
        slug: 'black',
        colorCode: '#2d2d2d',
        attributeId: 1,
      },
      {
        id: 5,
        name: 'زرد',
        slug: 'yellow',
        colorCode: '#ffff00',
        attributeId: 1,
      },
      {
        id: 6,
        name: 'طلایی',
        slug: 'gold',
        colorCode: '#ffd700',
        attributeId: 1,
      },
    ],
  });

  await prisma.category.createMany({
    data: [
      {
        id: 726,
        name: 'برچسب ماشین',
        slug: 'car-sticker',
        userId: 1,
      },
      {
        id: 2179,
        name: 'برچسب نوشته',
        parentId: 726,
        slug: 'text-sticker',
        userId: 1,
      },
      {
        id: 2176,
        name: 'برچسب تیبا',
        parentId: 726,
        slug: 'tiba-sticker',
        userId: 1,
      },
      {
        id: 2178,
        name: 'برچسب پارس',
        parentId: 726,
        slug: 'pars-sticker',
        userId: 1,
      },
      {
        id: 2177,
        name: 'برچسب 206',
        parentId: 726,
        slug: '206-sticker',
        userId: 1,
      },
      {
        id: 2175,
        name: 'برچسب پراید',
        parentId: 726,
        slug: 'pride-sticker',
        userId: 1,
      },
    ],
  });

  await prisma.gallery.createMany({
    data: [
      {
        id: 1,
        title: 'دسته بندی',
        userId: 1,
      },
      {
        id: 2,
        title: 'برچسب ماشین',
        userId: 1,
      },
    ],
  });

  await prisma.shipping.createMany({
    data: [
      {
        id: 1,
        name: 'پست ویژه',
        price: 75000,
        estimatedDays: 2,
        userId: 1,
      },
      {
        id: 2,
        name: 'پست پیشتاز',
        price: 60000,
        estimatedDays: 4,
        userId: 1,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
