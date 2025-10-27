import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => c.text("Hello Hono!"));

app.get("/ping", (c) => c.json({ message: "pong" }));

export default app;
