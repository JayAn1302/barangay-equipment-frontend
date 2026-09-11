const KEYS = ["token", "username", "role", "fullName"];

export function saveAuth(data, remember) {
  const storage = remember ? localStorage : sessionStorage;
  const other = remember ? sessionStorage : localStorage;

  storage.setItem("token", data.token);
  storage.setItem("username", data.username);
  storage.setItem("role", data.role);
  storage.setItem("fullName", data.fullName);

  // clear the other storage so a stale copy can't linger
  KEYS.forEach((k) => other.removeItem(k));
}

export function getRole() {
  return localStorage.getItem("role") || sessionStorage.getItem("role");
}

export function getToken() {
  return localStorage.getItem("token") || sessionStorage.getItem("token");
}

export function clearAuth() {
  KEYS.forEach((k) => {
    localStorage.removeItem(k);
    sessionStorage.removeItem(k);
  });
}