import express, { Request, Response, NextFunction } from "express";
import cors from 'cors'
import path from "path";
import { ValidationError } from "yup";

import "express-async-errors";

import { routes } from "./routes";

import "./database/connection";

const app = express();

app.use(cors())

app.use(express.json());

app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ValidationError) {
    const errors = err.inner.map((it) => ({ [it.path]: it.errors }));

    return res.status(400).json(errors);
  }

  console.log(err);

  return res.status(500).json({ message: "Internal server error" });
});

app.listen(3333, () => console.log("It is running 🚀"));
