import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {BasketModule} from "./modules/basket/basket.module";
import {DiscountModule} from "./modules/discount/discount.module";
import {ProductModule} from "./modules/product/product.module";
import {PaymentModule} from "./modules/payment/payment.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "akshaykuomar",
      database: "postgres",
      autoLoadEntities: true,
      synchronize: true,
      entities: [
        "dist/**/**/**/*.entity{.ts,.js}",
        "dist/**/**/*.entity{.ts,.js}",
      ],
    }),
    ProductModule,
    DiscountModule,
    BasketModule,
    PaymentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
