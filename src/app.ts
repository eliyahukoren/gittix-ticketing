import { json } from "body-parser";
import cookieSession from "cookie-session";
import express from "express";
import "express-async-errors";
import { createTicketRouter } from "./routes/new";

import { currentUser, errorHandler, NotFoundError } from "@tickets-ek/common";

const app = express();

app.set("trust proxy", true);

app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(currentUser);

// define routes
app.use(createTicketRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

// define error handle middleware
app.use(errorHandler);

export { app };

