const available =
  typeof window !== "undefined" && window.sessionStorage !== undefined;

export function getItem(name: string): string | null {
  if (!available) {
    return "";
  }
  return window.sessionStorage.getItem(name);
}

export function removeItem(name: string): void {
  if (available) {
    window.sessionStorage.removeItem(name);
  }
}

export function setItem(name: string, value: string): void {
  if (available) {
    window.sessionStorage.setItem(name, value);
  }
}
