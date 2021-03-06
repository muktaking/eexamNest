import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "11292",
  database: "eexammysql",
  entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  extra: {
    charset: "utf8_unicode_ci",
  },
  synchronize: true,
};
