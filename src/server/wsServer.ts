import ws from "ws";
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import { appRouter } from "./router";
import { createContext } from "./router/context";

let count = 0;
const wss = new ws.Server({
  port: 3001,
});

wss.on("connection", () => {
  console.log(`++ ws connection ${wss.clients.size} ${count}`);
  count += 1;
  wss.on("close", () => {
    console.log(`-- ws connection ${wss.clients.size}`);
  });
});

console.log(`ws server started`);

const handler = applyWSSHandler({ wss, createContext, router: appRouter });

process.on("SIGTERM", () => {
  console.log("SIGTERM");
  handler.broadcastReconnectNotification();
  wss.close();
});
