/** Mask secrets for console output. */
export function maskSecret(value, head = 4, tail = 4) {
  const s = (value || "").trim();
  if (!s) return "(empty)";
  if (s.length <= head + tail) return "*".repeat(s.length);
  return `${s.slice(0, head)}...${s.slice(-tail)}`;
}

export function maskHeaders(headers) {
  const out = { ...headers };
  for (const key of ["X-Api-Key", "X-Api-Access-Key", "Authorization"]) {
    if (out[key]) out[key] = maskSecret(out[key]);
  }
  if (out["X-Api-App-Key"]) out["X-Api-App-Key"] = maskSecret(out["X-Api-App-Key"], 3, 2);
  return out;
}
