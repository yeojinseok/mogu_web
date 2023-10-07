export function generateSecureID() {
  return window.crypto.getRandomValues(new Uint32Array(1))[0]
}
