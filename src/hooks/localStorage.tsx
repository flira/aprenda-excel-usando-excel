export class SafeLocalStorage {
  save(key: string, value: any): void {
    if (typeof localStorage === 'undefined') {
      return
    }
    localStorage.setItem(btoa(key), btoa(JSON.stringify(value)))
  }

  load(key: string): any {
    if (typeof localStorage === 'undefined') {
      return
    }
    const value = localStorage.getItem(btoa(key)) as string | null
    return value ? JSON.parse(atob(value)) : value
  }

  delete(key: string) {
    if (typeof localStorage === 'undefined') {
      return
    }
    localStorage.removeItem(btoa(key))
  }
}

export function safeStorage() {
  return new SafeLocalStorage()
}

export default safeStorage