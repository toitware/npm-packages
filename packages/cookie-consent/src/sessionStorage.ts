export class SessionStorage {
  private static available(): boolean {
    return typeof window !== "undefined" && window.sessionStorage !== undefined;
  }

  static getItem(name: string): string | null {
    if (!SessionStorage.available()) {
      return "";
    }
    return window.sessionStorage.getItem(name);
  }

  static removeItem(name: string): void {
    if (!SessionStorage.available()) {
      return;
    }
    window.sessionStorage.removeItem(name);
  }

  static setItem(name: string, value: string): void {
    if (!SessionStorage.available()) {
      return;
    }
    window.sessionStorage.setItem(name, value);
  }
}
