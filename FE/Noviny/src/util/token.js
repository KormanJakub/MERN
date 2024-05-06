export function decodeJWT(token) {
  const payload = token.split(".")[1];
  const decodedPayload = atob(payload.replace(/_/g, "/").replace(/-/g, "+"));
  return JSON.parse(decodedPayload);
}
