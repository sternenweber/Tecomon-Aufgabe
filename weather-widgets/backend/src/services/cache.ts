const ttl = Number(process.env.CACHE_TTL_MS || 300_000);

export class TTLCache<V> {
  private store = new Map<string, { ts: number; value: V }>();

  get(key: string): V | null {
    const hit = this.store.get(key);
    if (!hit) return null;
    if (Date.now() - hit.ts > ttl) {
      this.store.delete(key);
      return null;
    }
    return hit.value;
  }

  set(key: string, value: V) {
    this.store.set(key, { ts: Date.now(), value });
  }
}
