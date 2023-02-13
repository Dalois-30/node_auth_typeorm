import { DataSource } from "typeorm"

export const myDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "toor",
    password: "root",
    database: "testTypeOrm",
    entities: ["src/modules/*/models/*.js"],
    logging: true,
    synchronize: true,
})