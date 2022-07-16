import { DataSource } from "typeorm";
import { gray } from "chalk";

import { Photo } from "./entity/photo.entity";
import { Tag } from "./entity/tag.entity";
import { Url } from "./entity/url.entity";

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "20210908",
  entities: [Photo, Tag, Url],
  synchronize: true,
  logging: false,
});

// to initialize initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
AppDataSource.initialize()
  .then(() => {
    // here you can start to work with your database
    console.log(gray(`\n   Database link successful `));
  })
  .catch((error) => console.log(error));

export default AppDataSource;
