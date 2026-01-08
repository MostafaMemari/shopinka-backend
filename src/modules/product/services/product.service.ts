import { BadRequestException, ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductRepository } from '../repositories/product.repository';
import { BulkPricing, OrderStatus, Prisma, Product, ProductStatus, ProductType, ProductVariant } from '@prisma/client';
import { GalleryItemRepository } from '../../gallery/repositories/gallery-item.repository';
import slugify from 'slugify';
import { AttributeRepository } from '../../attribute/repositories/attribute.repository';
import { QueryProductDto } from '../dto/query-product.dto';
import { pagination } from '../../../common/utils/pagination.utils';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { ProductMessages } from '../enums/product-messages.enum';
import { FavoriteRepository } from '../repositories/favorite.repository';
import { FavoriteMessages } from '../enums/favorite-messages.enum';
import { CategoryRepository } from '../../category/category.repository';
import { OrderItemRepository } from '../../order/repositories/order-item.repository';
import { TagRepository } from '../../tag/tag.repository';
import { QueryPublicProductDto } from '../dto/query-public-product.dto';
import { SetDefaultVariantDto } from '../dto/update-product-variant.dto';
import { ProductVariantRepository } from '../repositories/product-variant.repository';
import { BulkPricingRepository } from '../../bulk-pricing/repositories/bulk-pricing.repository';
import { CalculateBulkPriceDto } from '../dto/calculate-bulk-price.dto';
import { CustomStickerRepository } from '../../custom-sticker/custom-sticker.repository';

const products = [
  { id: 1, slug: 'bak-khodro' },
  { id: 2, slug: 'dar-vosf-doshmanan-kasi-joz-ashna-nist' },
  { id: 3, slug: 'bal-o-gorg' },
  { id: 4, slug: 'zarbane-ghalb-405' },
  { id: 5, slug: 'zarbane-ghalb-mashin-206' },
  { id: 6, slug: 'zarbane-ghalb-farmand' },
  { id: 7, slug: 'pars' },
  { id: 10, slug: 'khodaya' },
  { id: 11, slug: 'bal-o-taj' },
  { id: 12, slug: 'bal-o-shir' },
  { id: 13, slug: 'mashin-206-kaf-khob' },
  { id: 14, slug: 'sobh-mishe-in-shab' },
  { id: 15, slug: 'godal-sefid' },
  { id: 16, slug: 'ba-har-ki-mesle-khodesh' },
  { id: 17, slug: 'bal-askalat' },
  { id: 18, slug: 'godal' },
  { id: 19, slug: 'ajab' },
  { id: 20, slug: 'my-206' },
  { id: 21, slug: 'dige-pesar-khobi-shodam' },
  { id: 22, slug: 'bal-1' },
  { id: 23, slug: 'bal-2' },
  { id: 24, slug: 'sticker-key-o-priz-model-adamak-barqi-2pcs' },
  { id: 25, slug: 'shabgard-tanha' },
  { id: 26, slug: 'zarbane-ghalb-1' },
  { id: 27, slug: 'ye-rooz-khob' },
  { id: 28, slug: 'zarbane-ghalb-mashin-1' },
  { id: 29, slug: 'bal-3' },
  { id: 30, slug: 'askalat-1' },
  { id: 31, slug: 'mashallah-1' },
  { id: 32, slug: 'king-sefid' },
  { id: 33, slug: 'shir-1' },
  { id: 34, slug: 'zarbane-ghalb-bodnesazi' },
  { id: 35, slug: 'zarbane-ghalb-206' },
  { id: 36, slug: 'askalat-2' },
  { id: 37, slug: 'sticker-key-o-priz-khandeye-2pcs-10x10' },
  { id: 38, slug: 'bal-musiqi' },
  { id: 39, slug: 'king-1' },
  { id: 40, slug: 'bal-4' },
  { id: 41, slug: 'zarbane-ghalb-2' },
  { id: 42, slug: 'king-2' },
  { id: 43, slug: 'king-3' },
  { id: 44, slug: 'ba-har-ki-mesle-khodesh-1' },
  { id: 45, slug: 'bal-5' },
  { id: 46, slug: 'bal-askalat-2' },
  { id: 47, slug: 'king-4' },
  { id: 48, slug: 'pars-elx' },
  { id: 49, slug: 'in-niz-begzarad' },
  { id: 50, slug: 'king-elx' },
  { id: 51, slug: 'elx' },
  { id: 52, slug: 'zarbane-ghalb-405-1' },
  { id: 53, slug: 'king-405' },
  { id: 54, slug: 'kia' },
  { id: 55, slug: 'kurd' },
  { id: 56, slug: 'turk' },
  { id: 57, slug: 'taghir' },
  { id: 58, slug: 'navazesh-2' },
  { id: 59, slug: 'zarbane-ghalb-mashin-peugeot' },
  { id: 60, slug: 'i-love-my-206' },
  { id: 61, slug: 'dige-dokhtar-khobi-shodam' },
  { id: 62, slug: 'zarbane-ghalb-pride-111' },
  { id: 63, slug: 'i-love-my-206-1' },
  { id: 64, slug: 'navazesh' },
  { id: 65, slug: 'eliminator' },
  { id: 66, slug: 'zarbane-ghalb-pride' },
  { id: 67, slug: 'mashin-pride-kaf-khob' },
  { id: 68, slug: 'zarbane-ghalb-mashin-206-1' },
  { id: 69, slug: 'shir-2' },
  { id: 70, slug: 'ghalb-allah' },
  { id: 71, slug: 'king-pars-pars' },
  { id: 72, slug: 'salavat' },
  { id: 73, slug: 'chukur-godal-cukur-133' },
  { id: 74, slug: 'violent' },
  { id: 75, slug: 'moharram-hossein' },
  { id: 76, slug: 'moharram-hossein-1' },
  { id: 77, slug: 'salam-bar-moharram' },
  { id: 78, slug: 'mashin-peugeot-kaf-khob' },
  { id: 79, slug: 'bismillah-rahman-rahim' },
  { id: 80, slug: 'salavat-1' },
  { id: 81, slug: 'zarbane-ghalb-mashin-206-2' },
  { id: 82, slug: 'moharram-yah-hossein' },
  { id: 83, slug: 'moharram-hossein-2' },
  { id: 84, slug: 'moharram-yah-hossein-1' },
  { id: 85, slug: 'mashin-peugeot-206-set-3pcs' },
  { id: 86, slug: 'drift-king' },
  { id: 87, slug: 'shir-king-of-the-roads' },
  { id: 88, slug: 'mashin-peugeot-pars-set-3pcs' },
  { id: 89, slug: 'godal-1' },
  { id: 90, slug: 'mashin-peugeot-206-set-3pcs' },
  { id: 91, slug: 'bal-shir-king' },
  { id: 92, slug: 'mard-khati-mashin-206-kaf-khob' },
  { id: 93, slug: 'askalat-gladiator' },
  { id: 94, slug: 'pride-111-kaf-khob' },
  { id: 95, slug: 'savage' },
  { id: 96, slug: 'mashin-peugeot-pars' },
  { id: 97, slug: 'bal-shir-violent' },
  { id: 98, slug: 'bal-6' },
  { id: 99, slug: 'zarbane-ghalb-tiba-set-2pcs' },
  { id: 100, slug: 'ehteram-be-mashin-pride-111' },
  { id: 101, slug: 'askalat-3' },
  { id: 102, slug: 'zarbane-ghalb-sag' },
  { id: 103, slug: 'bismillah-ar-rahman-ar-raheem' },
  { id: 104, slug: 'mikhay-badi-nabini-khobi-nakon' },
  { id: 105, slug: 'zarbane-ghalb-mashin-tiba' },
  { id: 106, slug: 'baghal-logo-mashin-2pcs' },
  { id: 107, slug: 'bal-askalat-ride-or-die' },
  { id: 108, slug: 'baghal-logo-mashin-2pcs-1' },
  { id: 109, slug: 'baghal-logo-mashin-2pcs-2' },
  { id: 110, slug: 'askalat-4' },
  { id: 111, slug: 'zarbane-ghalb-musiqi' },
  { id: 112, slug: 'elahi-gahi-negahi' },
  { id: 113, slug: 'ba-har-ki-mesle-khodesh-2' },
  { id: 114, slug: 'ye-rooz-khob-miyad' },
  { id: 115, slug: 'ya-rab-nazar-bar-to-nagardad' },
  { id: 116, slug: 'bal-king-1' },
  { id: 117, slug: 'bal-king-2' },
  { id: 118, slug: 'static' },
  { id: 119, slug: 'bal-askalat-sniper' },
  { id: 120, slug: 'mashallah-2' },
  { id: 121, slug: 'violent-1' },
  { id: 122, slug: 'violent-2' },
  { id: 123, slug: 'baghal-logo-mashin-2pcs-3' },
  { id: 124, slug: 'king-king-set-4pcs-with-taj' },
  { id: 125, slug: 'bal-askalat-king-of-the-road' },
  { id: 126, slug: 'mashin-tiba-2-king' },
  { id: 127, slug: 'zarbane-ghalb-tiba-1' },
  { id: 128, slug: 'zarbane-ghalb-mashin-tiba-2' },
  { id: 129, slug: 'sticker-mashin-man-ashgh-peugeot' },
  { id: 130, slug: 'mashin-i-love-my-405' },
  { id: 131, slug: 'mashin-pride-i-love-my' },
  { id: 132, slug: 'mashin-pars-i-love-my' },
  { id: 133, slug: 'mashin-tiba-2-i-love-my' },
  { id: 134, slug: 'mashin-i-love-my-206-2' },
  { id: 135, slug: 'punisher' },
  { id: 136, slug: 'daram-pesar-khobi-misham' },
  { id: 137, slug: 'az-mast-ke-bar-mast' },
  { id: 138, slug: 'king-slx' },
  { id: 139, slug: 'langar-bismillah-ar-rahman-ar-rahim' },
  { id: 140, slug: 'mashin-peugeot-206-set-6pcs' },
  { id: 141, slug: 'zarbane-ghalb-askalat' },
  { id: 142, slug: 'zarbane-ghalb-206-1' },
  { id: 143, slug: 'madaram-mohtaj-dua-tam' },
  { id: 144, slug: 'navazesh-set-3pcs' },
  { id: 145, slug: 'mashin-pride-kaf-khob-o-police' },
  { id: 146, slug: 'mashin-peugeot-405-set-3pcs' },
  { id: 147, slug: 'mard-khati-mashin-pride-111-kaf-khob' },
  { id: 148, slug: 'sticker-mashin-tarh-the-king' },
  { id: 149, slug: 'shir-adac' },
  { id: 150, slug: 'mard-khati-mashin-pride-kaf-khob' },
  { id: 151, slug: 'zarbane-ghalb-peugeot' },
  { id: 152, slug: 'king-206' },
  { id: 153, slug: 'zarbane-ghalb-mashin-405-2' },
  { id: 154, slug: 'king-glx' },
  { id: 155, slug: 'faghat-khoda' },
  { id: 156, slug: 'zarbane-ghalb-3' },
  { id: 157, slug: 'hasbi-allah' },
  { id: 158, slug: 'dont-touch-my-pars' },
  { id: 159, slug: 'dont-touch-my-206' },
  { id: 160, slug: 'gorbeh' },
  { id: 161, slug: 'dont-touch-my-pars-1' },
  { id: 162, slug: 'dont-touch-my-206-1' },
  { id: 163, slug: 'dont-touch-my-111' },
  { id: 164, slug: 'dont-touch-my-pride' },
  { id: 165, slug: 'dont-touch-my-pride-111' },
  { id: 166, slug: 'dont-touch-my-pride-1' },
  { id: 167, slug: 'panda-poshte-ayene-mashin-2pcs' },
  { id: 168, slug: 'khejalat-zarar-nadare-tafrihi-bekeshid' },
  { id: 169, slug: 'zarbane-ghalb-mashin-pars-o-405' },
  { id: 170, slug: 'kash-mishe-sarnevesht-ra-az-sar-nevesht' },
  { id: 171, slug: 'javani-almasni-nadarad' },
  { id: 172, slug: 'va-khoda-ke-be-shidat-kafist' },
  { id: 173, slug: 'dige-pesar-khobi-shodam-1' },
  { id: 174, slug: 'bar-cheshm-khob-rahmat' },
  { id: 175, slug: 'zarbane-ghalb-taj' },
  { id: 176, slug: 'elahi-be-omid-to' },
  { id: 177, slug: 'mig-mig' },
  { id: 178, slug: 'zarbane-ghalb-mashin-pride-111-set-3pcs' },
  { id: 179, slug: 'hasbi-allah-o-neam-ol-vakil' },
  { id: 180, slug: 'askalat-5' },
  { id: 181, slug: 'oghghab' },
  { id: 182, slug: 'sticker-car-glass-matrix-elx' },
  { id: 183, slug: 'sticker-car-glass-matrix-violent' },
  { id: 184, slug: 'zarbane-ghalb-gorbeh' },
  { id: 185, slug: 'bad-boy' },
  { id: 186, slug: 'bal-shir-static' },
  { id: 187, slug: 'zarbane-ghalb-mashin-pride-1' },
  { id: 188, slug: 'zarbane-ghalb-mashin-pride-set-3pcs' },
  { id: 189, slug: 'zarbane-ghalb-pride-open' },
  { id: 190, slug: 'poshte-ayene-mashin-batman-2pcs' },
  { id: 191, slug: 'king-mashin-pride' },
  { id: 192, slug: 'pride' },
  { id: 193, slug: 'zarbane-ghalb-mashin-pride-2' },
  { id: 194, slug: 'ehteram-be-mashin-206' },
  { id: 195, slug: 'dont-touch-my-pars-for-pars' },
  { id: 196, slug: 'dont-touch-my-206-for-206' },
  { id: 197, slug: 'dont-touch-my-405-for-405' },
  { id: 198, slug: 'dont-touch-my-pride-for-pride' },
  { id: 199, slug: 'dont-touch-my-111-for-pride-111' },
  { id: 200, slug: 'bak-benzin-mashin-khali' },
  { id: 201, slug: 'bak-benzin-mashin-khali-1' },
  { id: 202, slug: 'bak-benzin-mashin-khali-2' },
  { id: 203, slug: 'zarbane-ghalb-taj-1' },
  { id: 204, slug: 'kyokushin' },
  { id: 205, slug: 'kaf-dast' },
  { id: 206, slug: 'khodeto-payda-kon-bagish-to-google' },
  { id: 207, slug: 'dar-javani-deltang-javani-shodim' },
  { id: 208, slug: 'mashin-bass-for-peugeot-206' },
  { id: 209, slug: 'mashin-bass-for-pride' },
  { id: 210, slug: 'mashin-bass-for-peugeot-405' },
  { id: 211, slug: 'mashin-bass-for-pride-111' },
  { id: 212, slug: 'hasbi-allah-o-neam-ol-vakil-1' },
  { id: 213, slug: 'hasbi-allah-o-neam-ol-vakil-2' },
  { id: 214, slug: 'salavat-allahom-sal-ala-mohammad-o-al-mohammad' },
  { id: 215, slug: 'bismillah-ar-rahman-ar-rahim-1' },
  { id: 216, slug: 'moharram-ya-aba-abadullah-al-hossein' },
  { id: 217, slug: 'salavat-allahom-sal-ala-mohammad-o-al-mohammad-1' },
  { id: 218, slug: 'moharram-ya-aba-abadullah-al-hossein-1' },
  { id: 219, slug: 'moharram-salam-bar-hossein' },
  { id: 220, slug: 'moharram-ya-abol-fazl-al-abbas' },
  { id: 221, slug: 'moharram-yah-hossein-2' },
  { id: 222, slug: 'moharram-salam-bar-hossein-1' },
  { id: 223, slug: 'sticker-motorbike-chukur-godal' },
  { id: 224, slug: 'sticker-motorbike-yaghi' },
  { id: 225, slug: 'ma-adama-faghat-poshte-traffic-poshte-hamim' },
  { id: 226, slug: 'khodaya-shokret' },
  { id: 227, slug: 'yaghi-1' },
  { id: 228, slug: 'ninja' },
  { id: 229, slug: 'hasbi-allah-1' },
  { id: 230, slug: 'zarbane-ghalb-mashin-3' },
  { id: 231, slug: 'zarbane-ghalb-mashin-4' },
  { id: 232, slug: 'zarbane-ghalb-mashin-5' },
  { id: 233, slug: 'boks' },
  { id: 234, slug: 'karate' },
  { id: 235, slug: 'rafiqam-ne-mifrooshamash' },
  { id: 236, slug: 'zarbane-ghalb-for-pride-111' },
  { id: 237, slug: 'abadan-tasliat' },
  { id: 238, slug: 'hasbi-allah-2' },
  { id: 239, slug: 'key-beshinim' },
  { id: 240, slug: 'to-haminjori-ghashangi' },
  { id: 241, slug: 'tavan-nadadid-ke-migid-ghashange' },
  { id: 242, slug: 'sticker-car-body-shir' },
  { id: 243, slug: 'sokoot-az-ma-ehsas-zarangi-az-shoma' },
  { id: 244, slug: 'ghese-sh-daraze' },
  { id: 245, slug: 'bache-positiv' },
  { id: 246, slug: 'tavansham-ghashange' },
  { id: 247, slug: 'forushi-nist-rafiqam' },
  { id: 248, slug: 'ghese-sh-daraze-1' },
  { id: 249, slug: 'tavansham-ghashange-1' },
  { id: 250, slug: 'forushi-nist-dadashim' },
  { id: 251, slug: 'bime-dua-madar' },
  { id: 252, slug: 'ghese-sh-daraze-2' },
  { id: 253, slug: 'hame-ranga-ghashange-joz-do-rangi' },
  { id: 254, slug: 'tavansham-ghashange-2' },
  { id: 255, slug: 'khob-negam-kon-kharare-khatere-sham' },
  { id: 256, slug: 'kheiliya-khobim-vali-selghe-ma-nistan' },
  { id: 257, slug: 'az-100-ta-mashin-chini-behtar' },
  { id: 258, slug: 'refaghat-faghat-ename-ghashange' },
  { id: 259, slug: 'hosle-kon' },
  { id: 260, slug: 'to-boro-khod-ra-bash' },
  { id: 261, slug: 'ey-kash-refaghat-fransavi-bud' },
  { id: 262, slug: 'ma-ham-khodai-darim' },
  { id: 263, slug: 'be-ma-namikhori' },
  { id: 264, slug: 'setare-111-moraba-monasb-for-pride-111' },
  { id: 265, slug: 'tavansham-ghashange-3' },
  { id: 266, slug: 'kash-zendegi-dandeh-aghab-dasht' },
  { id: 267, slug: 'ehteram-be-mashin-pride-1' },
  { id: 268, slug: 'ma-koochika-khodamon-borge' },
  { id: 269, slug: 'in-niz-begzarad-1' },
  { id: 270, slug: 'ehteram-be-mashin-for-pars' },
  { id: 271, slug: 'zarbane-ghalb-mashin-for-pars' },
  { id: 272, slug: 'la-hawla-wala-quwata-illa-billah' },
  { id: 273, slug: 'ye-vaghti-dorsh-dour-shodam-ghashange' },
  { id: 274, slug: 'marefat-yadesh-bekheir' },
  { id: 275, slug: 'engheza-darad-har-payani' },
  { id: 276, slug: 'ta-yadame-halemun-inhast' },
  { id: 277, slug: 'ma-adama-faghat-to-traffic-poshte-hamim-1' },
  { id: 278, slug: 'karma-hamishe-online' },
  { id: 279, slug: 'tavansh-ghashange-nabood-kart-babat-ghashangesh-kard' },
  { id: 280, slug: 'boro-bache-parro' },
  { id: 281, slug: 'roham-rafte-rooham-rafte' },
  { id: 282, slug: 'kheili-roya-be-khodam-bedakharam' },
  { id: 283, slug: 'balatar-az-siah-rangi-nist' },
  { id: 284, slug: 'ki-aziyt-konade-sadegi-khodam' },
  { id: 285, slug: 'hichki-shabihe-harfsash-nist' },
  { id: 286, slug: 'ghalb-pak-o-dast-bi-namak' },
  { id: 287, slug: 'chare-chie' },
  { id: 288, slug: 'age-ghashange-bud-esmesh-tavan-nabood' },
  { id: 289, slug: 'ghadr-hamo-bdonim-hamin' },
  { id: 290, slug: 'ye-moqe-hai-yadam-bioft' },
  { id: 291, slug: 'goftan-eshgh-goftam-madaram' },
  { id: 292, slug: 'vafadar-beman-hatta-be-ghalat' },
  { id: 293, slug: 'adab-lashkar-mard-bi-lashkar-ist' },
  { id: 294, slug: 'poshtam-eoni-ke-bala-sarme' },
  { id: 295, slug: 'n-didam-sorati-balta-az-taghir-adama' },
  { id: 296, slug: 'lahze-ham-por-az-hasrat-khab' },
  { id: 297, slug: 'asil-bash-to-donyaye-copyha' },
  { id: 298, slug: 'anqad-ke-mohabbat-tavan-darad-eshtebah-nadarad' },
  { id: 299, slug: 'shahr-az-bala-ghashange-adama-az-dur' },
  { id: 300, slug: 'che-shirin-bud-dastan-talkh-ma' },
  { id: 301, slug: 'bi-khial-tar-az-har-khial' },
  { id: 302, slug: 'tajrobeh-tavan-darad-pesar-khob' },
  { id: 303, slug: 'az-chi-begam' },
  { id: 304, slug: 'bani-adam-ro-avas-lashkar' },
  { id: 305, slug: 'aslan-man-bad' },
  { id: 306, slug: 'man-bad-az-in-bad' },
  { id: 307, slug: 'bedehkare-ashkaye-madar' },
  { id: 308, slug: 'didi-kar-khodara' },
  { id: 309, slug: 'be-yad-baazi-ha' },
  { id: 310, slug: 'donya-mordab-ghaflat-ha' },
  { id: 311, slug: 'ranj-doran-dide-im' },
  { id: 312, slug: 'man-aslan-bad' },
  { id: 313, slug: 'pirshedi-pesar' },
  { id: 314, slug: 'yadam-mire-farmoshet-konam' },
  { id: 315, slug: 'mat-kodam-khatere-i' },
  { id: 316, slug: 'rooz-haye-khob-ta-be-ma-resid-shab-shod' },
  { id: 317, slug: 'zibaryoan-bi-vafayand' },
  { id: 318, slug: 'yadetan-bashad-ke-yadman-hast' },
  { id: 319, slug: 'chesham-midad-delam-bavar-nakard' },
  { id: 320, slug: 'ma-bad-nabudim-balad-nabudim' },
  { id: 321, slug: 'choni-to-nazi' },
  { id: 322, slug: 'sar-bi-kasi-salamat' },
  { id: 323, slug: 'ghargham-khatere-i-pesar' },
  { id: 324, slug: 'yadet-miyad' },
  { id: 325, slug: 'mesle-ashk-az-chesham-oftadi' },
  { id: 326, slug: 'ma-koochika-khodamon-kheyli-borge' },
  { id: 327, slug: 'zendegi-zendan-sard-arzooha' },
  { id: 328, slug: 'pirmon-kardi-dokhtar-khob' },
  { id: 329, slug: 'oghvatam-talkhe-nane' },
  { id: 330, slug: 'madaram-sabet-kard-pedrisho' },
  { id: 331, slug: 'oson-ooldi-tajrobeh' },
  { id: 332, slug: 'tavanesh-sakht-bud' },
  { id: 333, slug: 'har-chizi-be-vaghtesh-ghashange' },
  { id: 334, slug: 'adama-por-az-tazahoran' },
  { id: 335, slug: 'tavansham-ghashange-4' },
  { id: 336, slug: 'judo-judo' },
  { id: 337, slug: 'shah-jadeh-road-king' },
  { id: 338, slug: 'delbar-ahi' },
  { id: 339, slug: 'jadeh-bash-na-magsad' },
  { id: 340, slug: 'dar-gir-zendegi-ashgh-e-jadeh' },
  { id: 341, slug: 'manam-ye-rooz-borge-misham' },
  { id: 342, slug: 'khaste-az-in-hame-takrar' },
  { id: 343, slug: 'moteham-radif-aval-jadeh' },
  { id: 344, slug: 'dir-beshe-hasrat-nashe' },
  { id: 345, slug: 'kheyli-zood-dir-mishe' },
  { id: 346, slug: 'pirshedi-pesar-1' },
  { id: 347, slug: 'asir-tam-bali-azad' },
  { id: 348, slug: 'tahte-taqib-wanted' },
  { id: 349, slug: 'to-shadi-gozashtam' },
  { id: 350, slug: 'mat-kodam-khatere-i-pesar-1' },
  { id: 351, slug: 'tak-o-tanha-ba-koli-arzoo' },
  { id: 352, slug: 'sharmandetam-javani' },
  { id: 353, slug: 'mat-kodam-khatere-i-pesar-2' },
  { id: 354, slug: 'hamahang-kon-nabinamet' },
  { id: 355, slug: 'safa-bashe' },
  { id: 356, slug: 'sen-bala-salamat' },
  { id: 357, slug: 'tanhaye-vahshi' },
  { id: 358, slug: 'matam-khatere-i-pesar' },
  { id: 359, slug: 'hamoon-sefid-maaruf' },
  { id: 360, slug: 'to-refigham-faghat-babam' },
  { id: 361, slug: 'ta-pakam-khakam-konid' },
  { id: 362, slug: 'ma-bad-nabudim-balad-nabudim-1' },
  { id: 363, slug: 'to-ham-shodi-khatere' },
  { id: 364, slug: 'zaman-hamoton-o-sabet-kard' },
  { id: 365, slug: 'aghebat-dars-nakhundan' },
  { id: 366, slug: 'roham-rafte-rooham-rafte-1' },
  { id: 367, slug: 'tavansham-ghashange-5' },
  { id: 368, slug: 'zarbane-ghalb-pride-111-1' },
  { id: 369, slug: 'zarbane-ghalb-peugeot-206-2' },
  { id: 370, slug: 'sticker-tarh-la-tansi-zekrallah' },
];

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly favoriteRepository: FavoriteRepository,
    private readonly galleryItemRepository: GalleryItemRepository,
    private readonly attributeRepository: AttributeRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly tagRepository: TagRepository,
    private readonly orderItemRepository: OrderItemRepository,
    private readonly productVariantRepository: ProductVariantRepository,
    private readonly bulkPricingRepository: BulkPricingRepository,
    private readonly customStickerRepository: CustomStickerRepository,
  ) {}

  async create(userId: number, createProductDto: CreateProductDto): Promise<{ message: string; product: Product }> {
    const { categoryIds, galleryImageIds, mainImageId, name, slug, sku, basePrice, salePrice, attributeIds, type, tagIds } =
      createProductDto;

    if (salePrice > basePrice) throw new BadRequestException(ProductMessages.SalePriceTooHigh);

    if (slug || sku) {
      const existingProduct = await this.productRepository.findOne({ where: { OR: [{ slug }, { sku }] } });
      if (existingProduct) throw new ConflictException(ProductMessages.AlreadyExistsProduct);
    }

    if (mainImageId) await this.galleryItemRepository.findOneOrThrow({ where: { id: mainImageId } });

    const images = galleryImageIds && (await this.galleryItemRepository.findAll({ where: { id: { in: galleryImageIds } } }));
    const categories = categoryIds && (await this.categoryRepository.findAll({ where: { id: { in: categoryIds } } }));
    const attributes = attributeIds && (await this.attributeRepository.findAll({ where: { id: { in: attributeIds } } }));
    const tags = tagIds && (await this.tagRepository.findAll({ where: { id: { in: tagIds } } }));

    const uniqueSlug = slug || (await this.generateUniqueSlug(name));

    delete createProductDto.galleryImageIds;
    delete createProductDto.attributeIds;
    delete createProductDto.categoryIds;
    delete createProductDto.tagIds;

    const newProduct = await this.productRepository.create({
      data: {
        ...createProductDto,
        userId,
        slug: uniqueSlug,
        mainImageId,
        galleryImages: galleryImageIds && { connect: images.map((image) => ({ id: image.id })) },
        attributes:
          type == ProductType.VARIABLE && attributeIds ? { connect: attributes.map((attribute) => ({ id: attribute.id })) } : undefined,
        categories: categoryIds && { connect: categories.map((cat) => ({ id: cat.id })) },
        tags: tagIds && { connect: tags.map((tag) => ({ id: tag.id })) },
      },
    });

    return { message: ProductMessages.CreatedProductSuccess, product: newProduct };
  }

  async migrateProductSlugs(): Promise<{ updated: number }> {
    let updatedCount = 0;

    for (const product of products) {
      const newSlug = await this.generateUniqueSlug(product.slug, 'car-sticker');

      await this.productRepository.update({
        where: { id: product.id },
        data: { slug: newSlug },
      });

      updatedCount++;
    }

    return { updated: updatedCount };
  }

  async findAllPublic({ page, take, ...query }: QueryPublicProductDto): Promise<unknown> {
    const paginationDto = { page, take };

    const {
      hasDiscount,
      attributeValueIds,
      minPrice,
      maxPrice,
      stockStatus,
      search,
      includeMainImage,
      includeVariants,
      sortBy,
      tagIds,
      categoryIds,
      includeBulkPrices,
    } = query;

    const filters: Prisma.ProductWhereInput = {
      status: ProductStatus.PUBLISHED,
    };

    if (search) filters.name = { contains: search };

    if (hasDiscount) filters.salePrice = { not: null };

    if (categoryIds) filters.categories = { some: { id: { in: categoryIds } } };

    if (tagIds) filters.tags = { some: { id: { in: tagIds } } };

    if (categoryIds?.length) {
      filters.categories = {
        some: { id: { in: categoryIds } },
      };
    }

    if (attributeValueIds?.length) {
      filters.attributes = {
        some: {
          values: {
            some: { id: { in: attributeValueIds } },
          },
        },
      };
    }

    if (minPrice || maxPrice) {
      filters.OR = [];

      if (minPrice && maxPrice) {
        filters.OR.push({
          salePrice: { gte: minPrice, lte: maxPrice },
        });
        filters.OR.push({
          salePrice: null,
          basePrice: { gte: minPrice, lte: maxPrice },
        });
      } else if (minPrice) {
        filters.OR.push({
          salePrice: { gte: minPrice },
        });
        filters.OR.push({
          salePrice: null,
          basePrice: { gte: minPrice },
        });
      } else if (maxPrice) {
        filters.OR.push({
          salePrice: { lte: maxPrice },
        });
        filters.OR.push({
          salePrice: null,
          basePrice: { lte: maxPrice },
        });
      }
    }

    if (stockStatus === 'instock') {
      filters.quantity = { gt: 0 };
    }

    const orderBy: Prisma.ProductOrderByWithRelationInput = (() => {
      switch (sortBy) {
        case 'price_asc':
          return { basePrice: 'asc' as Prisma.SortOrder };
        case 'price_desc':
          return { basePrice: 'desc' as Prisma.SortOrder };
        case 'newest':
        default:
          return { createdAt: 'desc' as Prisma.SortOrder };
      }
    })();

    const products = await this.productRepository.findAll({
      where: filters,
      orderBy,
      select: {
        id: true,
        name: true,
        salePrice: true,
        basePrice: true,
        updatedAt: true,
        createdAt: true,
        slug: true,
        type: true,
        quantity: true,
        defaultVariantId: true,
        mainImage: includeMainImage && {
          select: { fileUrl: true, id: true, title: true, description: true },
        },
        variants: includeVariants && {
          select: {
            id: true,
            salePrice: true,
            basePrice: true,
            attributeValues: true,
            quantity: true,
          },
        },
        bulkPrices: includeBulkPrices,
      },
    });

    return pagination(paginationDto, products);
  }

  async setDefaultVariant(userId: number, productId: number, dto: SetDefaultVariantDto): Promise<{ message: string; product: Product }> {
    const product = (await this.productRepository.findOneOrThrow({
      where: { id: productId, userId },
      include: {
        variants: true,
        defaultVariant: true,
      },
    })) as Product & { variants: ProductVariant[]; defaultVariant: ProductVariant | null };

    if (product.type !== ProductType.VARIABLE) {
      throw new BadRequestException(ProductMessages.InvalidProductType);
    }

    if (dto.variantId === null) {
      const updatedProduct = await this.productRepository.update({
        where: { id: productId },
        data: { defaultVariantId: null },
        include: { defaultVariant: true },
      });

      return {
        message: ProductMessages.DefaultVariantRemovedSuccess,
        product: updatedProduct,
      };
    }

    const variant = product.variants.find((v) => v.id === dto.variantId);
    if (!variant) {
      throw new BadRequestException(ProductMessages.InvalidVariant);
    }

    const updatedProduct = await this.productRepository.update({
      where: { id: productId },
      data: { defaultVariantId: dto.variantId },
      include: { defaultVariant: true },
    });

    return {
      message: ProductMessages.SetProductVariantSuccess,
      product: updatedProduct,
    };
  }

  async getFavorite(userId: number, productId: number): Promise<boolean> {
    await this.productRepository.findOneOrThrow({ where: { id: productId } });

    const existingFavorite = await this.favoriteRepository.findOne({ where: { productId, userId } });

    return existingFavorite ? true : false;
  }

  async findAllAdmin({ page, take, ...queryProductDto }: QueryProductDto): Promise<unknown> {
    const paginationDto = { page, take };
    const {
      description,
      endDate,
      includeUser,
      name,
      slug,
      sortBy,
      sortDirection,
      startDate,
      type,
      height,
      includeAttributes,
      includeGalleryImages,
      includeMainImage,
      length,
      maxPrice,
      minPrice,
      quantity,
      salePrice,
      shortDescription,
      sku,
      weight,
      width,
      includeVariants,
      includeTags,
      includeSeoCategories,
      includeAttributeValues,
      includeBulkPrices,
      includeSeoMeta,
      categoryIds,
      tagIds,
    } = queryProductDto;

    const filters: Prisma.ProductWhereInput = { status: ProductStatus.PUBLISHED };

    if (sku) filters.sku = { contains: sku };
    if (shortDescription) filters.shortDescription = { contains: shortDescription };
    if (description) filters.description = { contains: description };
    if (name) filters.name = { contains: name };
    if (slug) filters.slug = { contains: slug };
    if (type) filters.type = type;
    if (salePrice) filters.salePrice = salePrice;
    if (height) filters.height = height;
    if (weight) filters.weight = weight;
    if (width) filters.width = width;
    if (length) filters.length = length;
    if (quantity) filters.quantity = quantity;
    if (startDate || endDate) {
      filters.createdAt = {};
      if (startDate) filters.createdAt.gte = new Date(startDate);
      if (endDate) filters.createdAt.lte = new Date(endDate);
    }
    if (maxPrice || minPrice) {
      filters.basePrice = {};
      if (maxPrice) filters.basePrice.gte = maxPrice;
      if (minPrice) filters.basePrice.lte = minPrice;
    }

    if (categoryIds?.length) {
      filters.categories = {
        some: { id: { in: categoryIds } },
      };
    }

    if (tagIds?.length) {
      filters.tags = {
        some: { id: { in: tagIds } },
      };
    }

    const products = await this.productRepository.findAll({
      where: filters,
      orderBy: { [sortBy || 'createdAt']: sortDirection || 'desc' },
      include: {
        categories: includeSeoCategories,
        tags: includeTags,
        attributes: includeAttributes && { include: { values: includeAttributeValues } },
        galleryImages: includeGalleryImages,
        mainImage: includeMainImage,
        user: includeUser,
        variants: includeVariants && { include: { mainImage: true, attributeValues: includeAttributeValues } },
        bulkPrices: includeBulkPrices,
        seoMeta: includeSeoMeta,
      },
    });

    return { ...pagination(paginationDto, products) };
  }

  findOne(id: number): Promise<Product> {
    return this.productRepository.findOneOrThrow({
      where: { id, status: ProductStatus.PUBLISHED },
      include: {
        galleryImages: true,
        mainImage: true,
        user: true,
        tags: true,
        categories: true,
        attributes: true,
        variants: { include: { attributeValues: true } },
        seoMeta: true,
        bulkPrices: true,
      },
    });
  }

  findOneBySlug(slug: string): Promise<Product> {
    return this.productRepository.findOneOrThrow({
      where: { slug, status: ProductStatus.PUBLISHED },
      include: {
        galleryImages: true,
        mainImage: true,
        user: true,
        tags: true,
        categories: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        attributes: true,
        variants: { include: { attributeValues: true, mainImage: true } },
        seoMeta: true,
        bulkPrices: true,
      },
    });
  }

  findOneDraft(userId: number, id: number): Promise<Product> {
    return this.productRepository.findOneOrThrow({
      where: { userId, id, status: ProductStatus.DRAFT },
      include: { attributes: { include: { values: true } }, galleryImages: true, mainImage: true, user: true, bulkPrices: true },
    });
  }

  async update(userId: number, productId: number, updateProductDto: UpdateProductDto): Promise<{ message: string; product: Product }> {
    const { status, categoryIds, galleryImageIds, mainImageId, slug, sku, basePrice, salePrice, attributeIds, type, tagIds } =
      updateProductDto;

    const product = await this.productRepository.findOneOrThrow({ where: { id: productId, userId }, include: { variants: true } });

    if ((salePrice && basePrice && salePrice > basePrice) || (salePrice && salePrice > product.basePrice)) {
      throw new BadRequestException(ProductMessages.SalePriceTooHigh);
    }

    if (slug || sku) {
      const existingProduct = await this.productRepository.findOne({ where: { id: { not: productId }, OR: [{ slug }, { sku }] } });
      if (existingProduct) throw new ConflictException(ProductMessages.AlreadyExistsProduct);
    }

    if (mainImageId) await this.galleryItemRepository.findOneOrThrow({ where: { id: mainImageId } });

    const orderItems = await this.orderItemRepository.findAll({
      where: {
        productVariantId: { in: product['variants'].map((v) => v.id) },
      },
      include: { order: true },
    });

    const hasUndeliveredOrderItems = orderItems.some((item) => item['order'].status !== OrderStatus.DELIVERED);

    if (hasUndeliveredOrderItems && type && type === ProductType.SIMPLE) {
      throw new ForbiddenException(ProductMessages.CannotChangeToSimpleType);
    }

    if (hasUndeliveredOrderItems && status && status === ProductStatus.DRAFT) {
      throw new ForbiddenException(ProductMessages.CannotDraftProductWithPendingOrders);
    }

    const categories = categoryIds && (await this.categoryRepository.findAll({ where: { id: { in: categoryIds } } }));
    const images = galleryImageIds && (await this.galleryItemRepository.findAll({ where: { id: { in: galleryImageIds } } }));
    const attributes = attributeIds && (await this.attributeRepository.findAll({ where: { id: { in: attributeIds } } }));
    const tags = tagIds && (await this.tagRepository.findAll({ where: { id: { in: tagIds } } }));

    const isAllowedProductType = attributeIds && (product.type == ProductType.VARIABLE || (type && type == ProductType.VARIABLE));

    delete updateProductDto.attributeIds;
    delete updateProductDto.galleryImageIds;
    delete updateProductDto.categoryIds;
    delete updateProductDto.tagIds;

    const updatedProduct = await this.productRepository.update({
      where: { id: productId },
      data: {
        ...updateProductDto,
        galleryImages: images ? { set: images.map((image) => ({ id: image.id })) } : undefined,
        attributes: isAllowedProductType ? { set: attributes.map((attribute) => ({ id: attribute.id })) } : undefined,
        tags: tagIds && { set: tags.map((cat) => ({ id: cat.id })) },
        categories: categoryIds && { set: categories.map((cat) => ({ id: cat.id })) },
        variants: type && type == ProductType.SIMPLE ? { deleteMany: { productId } } : undefined,
        orderItems: status && status == ProductStatus.DRAFT ? { deleteMany: { productId } } : undefined,
        cartItems: status && status == ProductStatus.DRAFT ? { deleteMany: { productId } } : undefined,
        favorites: status && status == ProductStatus.DRAFT ? { deleteMany: { productId } } : undefined,
        defaultVariantId: type && type === ProductType.SIMPLE ? null : undefined,
      },
    });

    return { message: ProductMessages.UpdatedProductSuccess, product: updatedProduct };
  }

  async remove(userId: number, productId: number): Promise<{ message: string; product: Product }> {
    const product = await this.productRepository.findOneOrThrow({ where: { id: productId, userId }, include: { variants: true } });

    const orderItems = await this.orderItemRepository.findAll({
      where: {
        OR: [{ productVariantId: { in: product['variants'].map((v) => v.id) } }, { productId }],
      },
      include: { order: true },
    });

    const hasUndeliveredOrderItems = orderItems.some((item) => item['order'].status !== OrderStatus.DELIVERED);

    if (hasUndeliveredOrderItems) throw new ForbiddenException(ProductMessages.CannotRemoveProduct);

    const removedProduct = await this.productRepository.delete({ where: { id: productId } });

    return { message: ProductMessages.RemovedProductSuccess, product: removedProduct };
  }

  async findAllDrafts(userId: number, paginationDto: PaginationDto): Promise<unknown> {
    const products = await this.productRepository.findAll({
      where: { userId, status: ProductStatus.DRAFT },
      include: {
        attributes: { include: { values: true } },
        galleryImages: true,
        mainImage: true,
        user: true,
        variants: { include: { attributeValues: true } },
        bulkPrices: true,
      },
    });
    return pagination(paginationDto, products);
  }

  async favoriteToggle(userId: number, productId: number) {
    await this.productRepository.findOneOrThrow({ where: { id: productId } });

    const existingFavorite = await this.favoriteRepository.findOne({ where: { productId, userId } });

    if (existingFavorite) {
      const removedFavorite = await this.favoriteRepository.delete({ where: { id: existingFavorite.id } });

      return { message: FavoriteMessages.RemovedFavoriteSuccess, favorite: removedFavorite };
    }

    const newFavorite = await this.favoriteRepository.create({ data: { productId, userId } });

    return { message: FavoriteMessages.CreatedFavoriteSuccess, favorite: newFavorite };
  }

  async calculateBestDiscount(
    calculateBulkPriceDto: CalculateBulkPriceDto,
  ): Promise<{ originalPrice: number; finalPrice: number; discount: number }> {
    const { targetId, quantity } = calculateBulkPriceDto;

    const product = await this.productRepository.findOne({ where: { id: targetId }, include: { bulkPrices: true } });
    const productVariant = await this.productVariantRepository.findOne({
      where: { id: targetId },
      include: { bulkPrices: true },
    });

    const customSticker = await this.customStickerRepository.findOne({ where: { id: targetId } });

    const targets = [customSticker, product, productVariant].filter((item) => item !== null);

    //TODO: add messages to enum
    if (targets.length !== 1) throw new BadRequestException('One target filed allowed.');

    if (product?.quantity < quantity || productVariant?.quantity < quantity) throw new BadRequestException('Invalid count.');

    const globalBulkPrices = await this.bulkPricingRepository.findAll({ where: { isGlobal: true } });

    const validDiscounts = [
      ...(((product || productVariant)?.['bulkPrices'] as BulkPricing[]) || [])?.filter((bp) => quantity >= bp.minQty),
      ...globalBulkPrices.filter((bp) => quantity >= bp.minQty),
    ];

    const basePrice = product ? product.basePrice : productVariant?.basePrice;
    const salePrice = product ? product.salePrice || 0 : productVariant?.salePrice || 0;
    const originalPrice = basePrice * quantity - salePrice * quantity;

    if (customSticker && !validDiscounts.length)
      return { finalPrice: customSticker.finalPrice * quantity, discount: 0, originalPrice: customSticker.finalPrice };
    if (validDiscounts.length == 0 || salePrice) return { finalPrice: originalPrice, discount: 0, originalPrice };

    let bestDiscountPrice = 0;

    for (const discount of validDiscounts) {
      let discountAmount = 0;

      if (discount.type == 'PERCENT') {
        if (customSticker) discountAmount = customSticker.finalPrice * quantity * (+discount.discount / 100);
        discountAmount = basePrice * quantity * (+discount.discount / 100);
      } else if (discount.type == 'FIXED') discountAmount = +discount.discount * quantity;

      if (discountAmount > bestDiscountPrice) bestDiscountPrice = discountAmount;
    }

    const finalPrice = basePrice * quantity - bestDiscountPrice;

    return {
      originalPrice: customSticker ? customSticker.finalPrice : originalPrice,
      discount: bestDiscountPrice,
      finalPrice: customSticker ? customSticker.finalPrice * quantity - bestDiscountPrice : finalPrice,
    };
  }

  private async generateUniqueSlug(name: string, baseSlug?: string): Promise<string> {
    let slug = slugify(name, { locale: 'fa', lower: true, strict: true, trim: true });

    if (baseSlug) {
      slug = `${slugify(baseSlug, { locale: 'fa', lower: true, strict: true, trim: true })}-${slug}`;
    }

    let suffix = 0;
    let uniqueSlug = slug;

    while (await this.productRepository.findOne({ where: { slug: uniqueSlug } })) {
      suffix++;
      uniqueSlug = `${slug}-${suffix}`;
    }

    return uniqueSlug;
  }

  async generateVariantsFromProducts() {
    await this.productVariantRepository.deleteMany({ where: {} });

    const products = await this.productRepository.findAll({
      where: { variants: { none: {} }, type: ProductType.VARIABLE },
    });

    const attributeIds = [
      { id: 2, name: 'white' },
      { id: 4, name: 'black' },
      { id: 3, name: 'red' },
      { id: 5, name: 'yellow' },
      { id: 6, name: 'gold' },
    ];

    for (const product of products) {
      const variants = await Promise.all(
        attributeIds.map((attr) =>
          this.productVariantRepository.create({
            data: {
              productId: product.id,
              userId: product.userId,
              basePrice: product.basePrice,
              salePrice: product.salePrice,
              width: product.width,
              length: product.length,
              weight: product.weight,
              quantity: 200,
              attributeValues: { connect: [{ id: attr.id }] },
            },
          }),
        ),
      );

      await this.productRepository.update({
        where: { id: product.id },
        data: {
          defaultVariantId: variants[0].id,
        },
      });
    }
  }
}
