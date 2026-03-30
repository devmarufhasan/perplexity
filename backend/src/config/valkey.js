import Valkey from "iovalkey";

import env from "./env.js";

let valkeyClient = null;

export async function connectValkey() {
  if (!env.valkeyEnabled) {
    console.log("Valkey disabled by configuration");
    return null;
  }

  if (valkeyClient) {
    return valkeyClient;
  }

  valkeyClient = new Valkey(env.valkeyUrl, {
    lazyConnect: true,
    maxRetriesPerRequest: 2,
    enableReadyCheck: true,
  });

  valkeyClient.on("connect", () => {
    console.log("Valkey connected");
  });

  valkeyClient.on("error", (error) => {
    console.error("Valkey error:", error.message);
  });

  await valkeyClient.connect();

  return valkeyClient;
}

export function getValkey() {
  return valkeyClient;
}

export async function disconnectValkey() {
  if (!valkeyClient) {
    return;
  }

  await valkeyClient.quit();
  valkeyClient = null;
}
