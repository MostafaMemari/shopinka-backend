import { Module, ValidationPipe } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';
import envConfig from '../../configs/env.config';
import { APP_PIPE } from '@nestjs/core';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { HttpApiModule } from '../http/http.module';
import { PaymentModule } from '../payment/payment.module';
import { GalleryModule } from '../gallery/gallery.module';
import { AwsModule } from '../s3AWS/s3AWS.module';
import { AddressModule } from '../address/address.module';
import { AttributeModule } from '../attribute/attribute.module';
import { ProductModule } from '../product/product.module';
import { CategoryModule } from '../category/category.module';
import { CommentModule } from '../comment/comment.module';
import { CartModule } from '../cart/cart.module';
import { OrderModule } from '../order/order.module';
import { BlogModule } from '../blog/blog.module';
import { SeoModule } from '../seo/seo.module';
import { TagModule } from '../tag/tag.module';
import { ShippingModule } from '../shipping/shipping.module';
import { AiModule } from '../ai/ai.module';
import { PageModule } from '../page/page.module';
import { ContactModule } from '../contact/contact.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot(envConfig()),
    CacheModule.register({
      isGlobal: true,
      ttl: 30,
      max: 100,
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    HttpApiModule,
    PaymentModule,
    GalleryModule,
    AwsModule,
    AddressModule,
    AttributeModule,
    ProductModule,
    CategoryModule,
    CommentModule,
    CartModule,
    OrderModule,
    BlogModule,
    SeoModule,
    TagModule,
    ShippingModule,
    AiModule,
    PageModule,
    ContactModule,
  ],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true }),
    },
  ],
})
export class AppModule {}
