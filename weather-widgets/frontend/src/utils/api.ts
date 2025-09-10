const API = process.env.NEXT_PUBLIC_API_URL as string;

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: { 
      'Content-Type': 'application/json', 
      ...(init?.headers || {}) 
    }
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
