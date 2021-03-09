"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "11292",
    database: "eexammysql",
    entities: [__dirname + "/../**/*.entity{.ts,.js}"],
    synchronize: true,
};
//# sourceMappingURL=typeorm.config.js.map