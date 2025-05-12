import { ConfigModuleOptions } from "@nestjs/config";
import * as Joi from "joi";

export default (): ConfigModuleOptions => {
  return {
    isGlobal: true,
    envFilePath: process.cwd() + "/.env",
    validate: (config: Record<string, any>) => {
      const schema = Joi.object({
        ACCESS_TOKEN_SECRET: Joi.string().required(),
        ACCESS_TOKEN_EXPIRE_TIME: Joi.string().required(),
        REFRESH_TOKEN_EXPIRE_TIME: Joi.string().required(),
        REFRESH_TOKEN_SECRET: Joi.string().required(),
      }).unknown(true);

      const { error, value } = schema.validate(config);

      if (error) {
        process.exit(1);
      }

      return value;
    },
  };
};
