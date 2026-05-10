import type { User } from "../types";

const API_BASE_URL = "http://localhost:8081/api/v1";
const AUTH_STORAGE_KEY = "carvisu.auth";

export const getStoredToken = (): string | null => {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { token?: string };
    return parsed.token ?? null;
  } catch {
    return null;
  }
};

interface AuthCredentials {
  email: string;
  password: string;
}

export interface ApiUser {
  id: string;
  email: string;
  name: string | null;
  character: string | null;
  created_at: string;
  updated_at: string;
}

export interface LoginResponse {
  user: ApiUser;
  token: string;
  refresh_token: string;
}

const parseError = async (response: Response): Promise<string> => {
  try {
    const data = await response.json();
    return data?.message || data?.error || "Unexpected error. Try again.";
  } catch {
    return "Unexpected error. Try again.";
  }
};

export const register = async ({
  email,
  password,
}: AuthCredentials): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }
};

export const login = async ({
  email,
  password,
}: AuthCredentials): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return (await response.json()) as LoginResponse;
};

export const mapApiUser = (apiUser: ApiUser): User => ({
  id: apiUser.id,
  email: apiUser.email,
  name: apiUser.name ?? "",
  credits: 0,
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${apiUser.id}`,
  createdAt: apiUser.created_at,
});
