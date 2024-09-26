import express from "express";
import { config } from "dotenv";
config();

import { ownersRouter, catsRouter } from "./crud.js";

const server = express();

server.use(express.json());
server.use(ownersRouter);
server.use(catsRouter);

const PORT = Number(process.env.SERVER_PORT) ?? 3000;

server.listen(PORT, () => {
  console.log("The server was started");
});
