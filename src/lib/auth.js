// src/lib/auth.js
import { getAuthOptions } from "./authOptions";

let cachedAuthOptions;

export async function getSafeAuthOptions() {
  if (!cachedAuthOptions) {
    cachedAuthOptions = await getAuthOptions();
  }
  return cachedAuthOptions;
}
