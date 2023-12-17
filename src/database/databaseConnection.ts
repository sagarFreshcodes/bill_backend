import mongoose from "mongoose";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "sagar123",
  database: "bill_project",
  synchronize: true,
  logging: true,
  entities: ["src/model/*{.ts,.js}"],
});

export const ConnectDatabase = (url: string) => {
  AppDataSource.initialize()
    .then(() => {
      console.log("postgresdb connect");
    })
    .catch((error) => {
      console.log("Error in pg connection", error);
    });
};
